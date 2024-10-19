using System;

namespace ConsoleApp1
{
    internal class Program
    {
        const int MaxN = 101;

        struct BeAdat
        {
            public int kor;
            public int fiz;
        }

        static void Main(string[] args)
        {
            BeAdat[] k = new BeAdat[MaxN];

            // beolvasas
            Console.Error.WriteLine("Kérem a keresési feltételt: [dolgozók száma] [korhatar] [fizetesihatar]");
            string[] beallitasok = Console.ReadLine().Split(' ');

            int dolgozokszama = Int32.Parse(beallitasok[0]);
            int korhatar = Int32.Parse(beallitasok[1]);
            int fizhatar = Int32.Parse(beallitasok[2]);

            Console.Error.WriteLine("Kérem az adatokat, soronként: [kor] [fizetes]");
            for (int i = 0; i < dolgozokszama; i++)
            {
                string[] tmp = Console.ReadLine().Split(' ');
                k[i].kor = Int32.Parse(tmp[0]);
                k[i].fiz = Int32.Parse(tmp[1]);
            }

            // beolvasás teszt
            Console.Error.WriteLine($"{dolgozokszama} dolgozó, korhatar: {korhatar}, fizhatar: {fizhatar}");
            for (int j = 0; j < dolgozokszama; j++)
            {
                Console.Error.WriteLine($"Kor: {k[j].kor}, Fizetés: {k[j].fiz}");
            }

            // művelet
            int Z = 0;
            for (int j = 0; j < dolgozokszama; j++)
            {
                if (k[j].kor > korhatar && k[j].fiz < fizhatar)
                {
                    Z += 1;
                }
            }
            Console.WriteLine($"{Z}");
        }   
    }
}
