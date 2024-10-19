using System;

namespace gyak5
{
    internal class Program
    {
        const int MaxN = 100;

        public struct TeruletT
        {
            public string n;
            public int Adb;
            public string[] a;
        }

        static void Main(string[] args)
        {
            TeruletT[] t = new TeruletT[MaxN];

            Console.WriteLine("Kérem a területek számát: ");
            int N = Int32.Parse(Console.ReadLine());

            for (int i = 0; i < N; i++)
            {
                Console.WriteLine("Kérem a terület nevét: ");
                t[i].n = Console.ReadLine();

                Console.WriteLine("Kérem az állatok számát: ");
                t[i].Adb = Int32.Parse(Console.ReadLine());

                t[i].a = new string[t[i].Adb];
                for (int j = 0; j < t[i].Adb; j++)
                {
                    Console.WriteLine("Kérem a(z) " + (j + 1) + ". állatot: ");
                    t[i].a[j] = Console.ReadLine();
                }
            }

            int osszAdb = 0;
            int dbMajomterulet = 0;
            bool vanKacsa = false;
            string tKacsa = "";

            for (int i = 0; i < N; i++)
            {
                osszAdb += t[i].Adb;
                for (int j = 0; j < t[i].Adb; j++)
                {
                    if (t[i].a[j] == "majom" || t[i].a[j] == "Majom")
                    {
                        dbMajomterulet++;
                    }
                    if (t[i].a[j] == "kacsa" || t[i].a[j] == "Kacsa")
                    {
                        vanKacsa = true;
                        tKacsa = t[i].n;
                    }
                }
            }

            kiiras(osszAdb, dbMajomterulet, tKacsa);
        }

        static void kiiras(int osszAdb, int dbMajomTer, string tKacsa)
        {
            Console.WriteLine("Az állatok száma összesen: " + osszAdb);
            Console.WriteLine("A majmos területek száma összesen: " + dbMajomTer);
            if (tKacsa == "")
            {
                Console.WriteLine("A Kacsa területe: " + tKacsa);
            }
            else
            {
                Console.WriteLine("Nem találok kacsás területet szóval most nincs háp háp.");
            }
        }
    }
}
