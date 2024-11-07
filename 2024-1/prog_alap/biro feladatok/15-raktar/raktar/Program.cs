using System;
namespace raktar
{
    internal class Program
    {
        const int maxTermek = 100;
        struct Kiszallitasok
        {
            public int termekid;
            public int mennyiseg;
        }
        static void Main(string[] args)
        {
            Kiszallitasok[] k = new Kiszallitasok[maxTermek];
            Console.Error.WriteLine("Kérem a [termékek] [kiszállítások számát]\tV: ");
            string[] tmp = Console.ReadLine().Split(" ");
            int termekszam = Int32.Parse(tmp[0]);
            int kiszallitasszam = Int32.Parse(tmp[1]);
            int[] termekek = new int[termekszam];
            int[] termekkiszallitva = new int[termekszam]; //a gyorsabb megoldás miatt itt csináltam meg a maradék termékes listát
            int[] kiszallitottrendezett = new int[termekszam];
            for (int i = 0; i < termekszam; i++)
            {
                Console.Error.WriteLine($"Kérem a(z) {i + 1}. terméket\tV: ");
                termekek[i] = Int32.Parse(Console.ReadLine());
                termekkiszallitva[i] = termekek[i];
            }
            for (int i = 0; i < kiszallitasszam; i++)
            {
                tmp = Console.ReadLine().Split(" ");
                k[i].termekid = Int32.Parse(tmp[0]);
                k[i].mennyiseg = Int32.Parse(tmp[1]);
                termekkiszallitva[k[i].termekid - 1] -= k[i].mennyiseg;
                kiszallitottrendezett[k[i].termekid - 1] += k[i].mennyiseg;
            }
            //feladatok: 
            int maxtermekid = 0;
            for (int i = 0; i < termekszam; i++)
            {
                if (termekek[i] > termekek[maxtermekid])
                {
                    maxtermekid = i;
                }
            }
            Console.WriteLine(maxtermekid + 1);

            //masodik feladat: 
            int kifogyottdarab = 0;
            int[] kifogyottak = new int[termekszam];
            for (int i = 0; i < termekszam; i++)
            {
                if (termekkiszallitva[i] == 0)
                {
                    kifogyottak[kifogyottdarab] = i + 1;
                    kifogyottdarab++;
                }
            }
            Console.Write(kifogyottdarab);
            for (int i = 0; i < kifogyottdarab; i++)
            {
                Console.Write($" {kifogyottak[i]}");
            }
            //harmadik feladat: 
            int valtozatlankeszlet = 0;
            for (int i = 0; i < termekszam; i++)
            {
                if (termekek[i] == termekkiszallitva[i])
                {
                    valtozatlankeszlet++;
                }
            }
            Console.WriteLine($"\n{valtozatlankeszlet}");

            /*
            negyedik feladat:
            *    ezt egyben is lehetett volna az előzővel simán elif ként.*/
            int maxid = 0;
            for (int i = 0; i < termekszam; i++)
            {
                if (termekek[i] != termekkiszallitva[i] && termekkiszallitva[i] > termekkiszallitva[maxid])
                {
                    maxid = i;
                }
            }
            Console.WriteLine(maxid + 1);

            //ötödik feladat:
            int[] rendezetsorrend = new int[termekszam];
            for (int i = 0; i < termekszam; i++)
            {
                rendezetsorrend[i] = i+1;
            }
            for (int j = 0; j < termekszam - 1; j++)
            {
                for (int i = 0; i < termekszam - j - 1; i++)
                {
                    if (kiszallitottrendezett[rendezetsorrend[i]-1] < kiszallitottrendezett[rendezetsorrend[i + 1]-1])
                    {
                        int temp = rendezetsorrend[i];
                        rendezetsorrend[i] = rendezetsorrend[i + 1];
                        rendezetsorrend[i + 1] = temp;
                    }
                }
            }

            Console.Write(rendezetsorrend[0]);
            for (int i = 1; i < termekszam; i++)
            {
                Console.Write($" { rendezetsorrend[i]}");
            }
        }
    }
}
