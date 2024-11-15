using System;

namespace Bojler
{
    internal class Program
    {
        const int MaxN = 100;

        struct BeAdat
        {
            public int kor;
            public int fiz;
        }

        static int maxkor(int dolgozokszama, BeAdat[] k)
        {
            int Z = 0;
            for (int i = 0; i < k.Length; i++)
            {
                if (k[i].kor >= Z)
                {
                    Z = k[i].kor;
                }
            }
            return Z;
        }

        static int ki40(int dolgozokszama, BeAdat[] k)
        {
            for (int i = 0; i < dolgozokszama; i++)
            {
                if (k[i].kor > 40 && k[i].fiz < 300)
                {
                    return i;
                }
            }
            return -1;
        }

        static int hanyfele(int n, BeAdat[] k)
        {
            int z = 0;
            for (int i = 0; i < n; i++)
            {
                bool egyedi = true;
                for (int j = 0; j < i; j++)
                {
                    if (k[i].kor == k[j].kor)
                    {
                        egyedi = false;
                        break;
                    }
                }
                if (egyedi)
                {
                    z++;
                }
            }
            return z;
        }


        static void kik30(int dolgozokszama, BeAdat[] k)
        {
            int Z = 0;
            for (int i = 0; i < dolgozokszama; i++)
            {
                if (k[i].kor < 30)
                {
                    Z = Z+1;
                }
            }
            Console.Write($"{Z} darab:");
            for (int i = 0; i < dolgozokszama; i++)
            {
                if (k[i].kor < 30)
                {
                    Console.Write($" {i + 1}");
                }
            }
        }

        static void Main(string[] args)
        {
            BeAdat[] k = new BeAdat[MaxN];

            // Beolvasás
            Console.Error.WriteLine("Kérem a dolgozók számát: ");
            int dolgozokszama = int.Parse(Console.ReadLine());

            Console.Error.WriteLine("Kérem az adatokat, soronként: [kor] [fizetes]");
            for (int i = 0; i < dolgozokszama; i++)
            {
                string[] tmp = Console.ReadLine().Split(' ');
                k[i].kor = int.Parse(tmp[0]);
                k[i].fiz = int.Parse(tmp[1]);
            }

            // Beolvasás teszt
            Console.Error.WriteLine($"Összesen {dolgozokszama} darab munkás van");
            for (int j = 0; j < dolgozokszama; j++)
            {
                Console.Error.WriteLine($"Kor: {k[j].kor}, Fizetés: {k[j].fiz}");
            }

            // Feladat megoldás
            //legidosebb kora
            Console.WriteLine($"Legidősebb dolgozó kora: {maxkor(dolgozokszama, k)}");
            //40 feletti aki 400 at keres
            int kiindex = ki40(dolgozokszama, k);
            if (kiindex != -1)
            {
                Console.WriteLine($"Az első dolgozó, aki 40 év feletti és fizetése 300 alatt: {kiindex + 1}.");
            }
            else
            {
                Console.WriteLine("Nincs 40 év feletti dolgozó, aki 300 alatti fizetést kap.");
            }
            //különböző koruak
            Console.WriteLine($"Különböző korú dolgozók száma: {hanyfele(dolgozokszama,k)}");

            //30 ev alattiak
            Console.WriteLine("30 év alatti dolgozók:");
            kik30(dolgozokszama,k);
        }
    }
}