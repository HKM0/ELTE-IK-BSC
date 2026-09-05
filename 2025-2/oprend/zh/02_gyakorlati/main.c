#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <signal.h>
#include <fcntl.h>
#include <time.h>
#include <sys/msg.h>
#include <sys/sem.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/wait.h>

char *whoami = 0;
#define pt(...) {printf("[%s] ", whoami ?: "N/A"); printf(__VA_ARGS__); printf("\n"); }

struct msg
{
    long type;
    char text[128];
};

void sig_handler(int sig)
{
    // ures handler pause megszakitasra
}

int main(int argc, char *argv[])
{
    srand(time(NULL));

    key_t key = ftok("main.c", 42);
    int msgQ = msgget(key, 0600 | IPC_CREAT);
    int sem = semget(key, 1, S_IRUSR | S_IWUSR | IPC_CREAT);
    semctl(sem, 0, SETVAL, 1);

    int b_to_m[2];
    int t_to_m[2];
    int m_to_b[2];

    pipe(b_to_m);
    pipe(t_to_m);
    pipe(m_to_b);

    signal(SIGUSR1, sig_handler);

    pid_t tutajos = fork();
    if (tutajos == 0)
    {
        whoami = "Tutajos";
        close(b_to_m[0]);
        close(b_to_m[1]);
        close(m_to_b[0]);
        close(m_to_b[1]);
        close(t_to_m[0]);

        sleep(1); // mimir
        kill(getppid(), SIGUSR1);

        struct msg rcv;
        msgrcv(msgQ, &rcv, sizeof(rcv) - sizeof(long), 1, 0);
        pt("Uzenet Matula bacsitol: %s", rcv.text);

        int halak_szama = rand() % 2 + 1; // random halacska szam
        sleep(1); // mimir itt is
        char msg_t_to_m[] = "A csuka megfogott stop, segítség stop!";
        write(t_to_m[1], msg_t_to_m, strlen(msg_t_to_m) + 1);
        write(t_to_m[1], &halak_szama, sizeof(halak_szama));

        close(t_to_m[1]);
        return 0;
    }

    pid_t butyok = fork();
    if (butyok == 0)
    {
        whoami = "Bütyök";
        close(t_to_m[0]);
        close(t_to_m[1]);
        close(b_to_m[0]);
        close(m_to_b[1]);

        sleep(2); // mimir megint
        kill(getppid(), SIGUSR1);

        struct msg rcv;
        msgrcv(msgQ, &rcv, sizeof(rcv) - sizeof(long), 2, 0);
        pt("Uzenet Matula bacsitol: %s", rcv.text);

        sleep(1); // jo ejszakat :)
        char msg_b_to_m[] = "Vizes a fa!";
        write(b_to_m[1], msg_b_to_m, strlen(msg_b_to_m) + 1);

        char valasz[128];
        read(m_to_b[0], valasz, sizeof(valasz));
        pt("Uzenet Matulatol: %s", valasz);

        pt("Indulok segiteni Tutajosnak.");

        close(b_to_m[1]);
        close(m_to_b[0]);
        return 0;
    }

    whoami = "Matula";
    close(t_to_m[1]);
    close(b_to_m[1]);
    close(m_to_b[0]);

    pause();
    pause();

    struct msg t_msg = {1, "3 halat kell fogni!"};
    struct msg b_msg = {2, "2 köteg fát kell gyűjteni!"};
    msgsnd(msgQ, &t_msg, sizeof(t_msg) - sizeof(long), 0);
    msgsnd(msgQ, &b_msg, sizeof(b_msg) - sizeof(long), 0);

    char buf1[128];
    read(b_to_m[0], buf1, sizeof(buf1));
    pt("Butyok uzenete: %s", buf1);

    char buf2[128];
    read(t_to_m[0], buf2, sizeof(buf2));
    pt("Tutajos uzenete: %s", buf2);

    int fogott_halak = 0;
    read(t_to_m[0], &fogott_halak, sizeof(fogott_halak));
    fogott_halak += 1;

    char m_to_b_msg[] = "Hagyja Béla a vizes fát másnak, segítsen a horgásznak!";
    write(m_to_b[1], m_to_b_msg, strlen(m_to_b_msg) + 1);

    waitpid(tutajos, NULL, 0);
    waitpid(butyok, NULL, 0);

    pt("Miután a csukának nem sikerült Magát megenni, örülök, hogy épségben előkerült.");

    struct sembuf down = {0, -1, 0};
    struct sembuf up = {0, 1, 0};

    semop(sem, &down, 1);

    FILE *f = fopen("halak.txt", "w");
    if (f)
    {
        fprintf(f, "A mai napon fogott halacskak szama: %d\n", fogott_halak);
        fclose(f);
    }

    semop(sem, &up, 1);

    msgctl(msgQ, IPC_RMID, NULL);
    semctl(sem, 0, IPC_RMID);

    close(t_to_m[0]);
    close(b_to_m[0]);
    close(m_to_b[1]);

    return 0;
}

//hgswou