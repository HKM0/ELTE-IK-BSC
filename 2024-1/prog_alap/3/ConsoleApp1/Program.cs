using System.Collections;
using System.Diagnostics.Metrics;

namespace ConsoleApp1
{
    internal class Program
    {
        const int MaxN = 101;
        struct BeAdat
        {
            public string sz;
            public string c;
            public int o;
        }
        static void Main(string[] args)
        {
            //
            Console.WriteLine("Konyvtar");
            int N;
            BeAdat[] k = new BeAdat[MaxN];
            int[] petofi = new int[MaxN];
            bool vanBiblia;

            //beolvasas
            N = Int32.Parse(Console.ReadLine());
            for (int j = 0; j < N; j++)
            {
                string[] tmp = Console.ReadLine().Split(';');
                k[j].sz = tmp[0];
                k[j].c = tmp[1];
                k[j].o = Int32.Parse(tmp[2]);

            }
            // algoritmusok implementalasa

                //bibia
            int i = 0;
            while ((i < N) && (k[i].c != "Biblia")) {
                i++;
            }
            vanBiblia = (i < N);
                //leghosszabb konyv
            int maxoldcimeindex = 0;
            for (int z = 0; z <= N; z++)
            {
                if (k[z].o > k[maxoldcimeindex].o)
                {
                    maxoldcimeindex = z;
                }
            }
                //leghosszabb cim
            int maxcimhosszindex = 0;
            for (int z = 0; z <= N; z++) {
                if (k[z].c.Length > k[maxcimhosszindex].c.Length)
                {
                    maxcimhosszindex = z;
                }
            }
                //arany blyet
            int aranyszam = 0;
            for (int a = 0; a <= N; a++)
            {
                if (k[a].c == "Arany Janos")
                {
                    aranyszam++;
                }
            }
                // osszes oldal
            int osszesoldal = 0;
            for (int b = 0; b<=N; b++)
            {
                osszesoldal += k[b].o;
            }
                //Petofi
            int petoficounter = 0;
            for (int b = 0; b <= N; b++)
            {
                if (k[b].sz == "Petofi Sandor")
                {
                    petofi[petoficounter] = b;
                    petoficounter++;
                }
            }
                //Fekete gyemantok
            int feketeGyemantokoldalszam = 0;
            for (int a = 0; a <= N; a++)
            {
                if (k[a].c == "Fekete Gyemantok")
                {
                    feketeGyemantokoldalszam = k[a].o;
                }
            }
            //Jokai
            int jokaimaxcimid = 0;
             for (int b = 0; b <= N; b++)
            {
                if (k[b].sz == "Jokai")
                {
                    if (k[b].c.Length > k[jokaimaxcimid].c.Length)
                    {
                        jokaimaxcimid = b;
                    }
                }
            }


            //kiiras
            Console.WriteLine("Biblia: "+(vanBiblia?"van":"nincs"));
            Console.WriteLine("A leghosszabb könyvnek a címe" + k[maxoldcimeindex]);
            Console.WriteLine("A leghosszabb című könyv címe" + k[maxcimhosszindex]);
            Console.WriteLine("Összesen " + aranyszam + " Arany által írt könyv van.");
            Console.WriteLine("Az oldalak száma összesen " + osszesoldal + " darab.");
            Console.WriteLine("Petőfi összes műve: ");
            foreach (int value in petofi)
            {
                Console.Write(k[value].c+", ");
            }
            Console.WriteLine("A Fekete Gyemantok osszesen " + feketeGyemantokoldalszam + " oldalas.");
            Console.WriteLine("Jokai leghosszabb című könyve: " + k[jokaimaxcimid].c + ".");





        
        
        }
    }


}
//következő héten állatkertes feladat lesz.