using System;
namespace csoportzh2kodolas
{
    internal class Program
    {

        const int MaxN = 100;

        struct Be
        {
            public int be;
            public int marad;
            public int ki;
        }

        static void Main(string[] args)
        {
            int N = 0;
            int hanytobb300 = 0;
            Be[] stat = new Be[MaxN];
            beolvas(out N, ref stat);
            elsofeladat(stat, N, out int hanytobb100);
            masodikfeladat(stat, N, out int osszesen);
            harmadikfeladat(stat, N, out int[] minhazadata, out int minhazadb);
            kiir(minhazadata, minhazadb, osszesen, hanytobb100);
        }

        static void beolvas(out int N, ref Be[] stat)
        {
            Console.Error.WriteLine("Kérem a napok számát: ");
            N = Int32.Parse(Console.ReadLine());
            while (N > MaxN || N < 1)
            {
                Console.Error.WriteLine("Hibás bemenet Add meg újból az adatot: ");
                N = Int32.Parse(Console.ReadLine());
            }
            string[] tmp = new string[3];
            for (int i = 0; i < N; i++)
            {
                Console.Error.WriteLine($"Kérem a {i + 1}. nap érkező, maradó és távozó vendégek számát\tV:");
                tmp = Console.ReadLine().Split(" ");
                stat[i].be = Int32.Parse(tmp[0]);
                stat[i].marad = Int32.Parse(tmp[1]);
                stat[i].ki = Int32.Parse(tmp[2]);

                while (stat[i].be < 0 || stat[i].marad < 0 || stat[i].ki < 0)
                {
                    Console.Error.WriteLine("Hibás bemenet Add meg újból az adatokat: ");
                    tmp = Console.ReadLine().Split(" ");
                    stat[i].be = Int32.Parse(tmp[0]);
                    stat[i].marad = Int32.Parse(tmp[1]);
                    stat[i].ki = Int32.Parse(tmp[2]);
                }

            }
        }
        static void elsofeladat(Be[] stat, int N, out int hanytobb100)
        {
            hanytobb100 = 0;
            for (int i = 0; i < N; i++) 
            { 
                if (stat[i].be > 100)
                {
                    hanytobb100++;
                }
            }
        }
        static void masodikfeladat(Be[] stat, int N, out int osszesen)
        {
            osszesen = 0;
            for (int i = 0; i < N; i++)
            {
                osszesen += stat[i].be;
            }
        }

        static void harmadikfeladat(Be[] stat, int N, out int[] minhazadata, out int minhazadb)
        {
            int minhaza = stat[0].ki;
            minhazadb = 0;
            minhazadata = new int[MaxN];
            for (int i = 0;i < N; i++)
            {
                if (stat[i].ki < minhaza)
                {
                    minhaza = stat[i].ki;
                }
            }
            for (int i = 0;i< N ; i++)
            {
                if (stat[i].ki == minhaza)
                {
                    minhazadata[minhazadb] = i + 1;
                    minhazadb++;
                }
            }
        }
        static void kiir(int[] minhazadata,int minhazadb, int osszesen, int hanytobb100)
        {
            Console.WriteLine(hanytobb100);
            Console.WriteLine($"{osszesen}");
            for (int i = 0; i < minhazadb; i++)
            {
                Console.Write($"{minhazadata[i]} ");
            }
        }

    }
}
