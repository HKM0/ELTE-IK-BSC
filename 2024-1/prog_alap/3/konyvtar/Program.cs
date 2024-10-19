using System;

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
            Console.Error.WriteLine("Konyvtar");
            int N;
            BeAdat[] k = new BeAdat[MaxN];
            int[] petofi = new int[MaxN];
            bool vanBiblia = false;

            // Beolvasás
            Console.Error.WriteLine("Hány darab könyv van?: ");
            N = Int32.Parse(Console.ReadLine());
            for (int j = 0; j < N; j++)
            {   
                Console.Error.WriteLine($"Kérem a {j+1}. könyvet, (Szerző;Cím;Oldal_szám): ");
                string[] tmp = Console.ReadLine().Split(';');
                k[j].sz = tmp[0];
                k[j].c = tmp[1];
                k[j].o = Int32.Parse(tmp[2]);
            }

            // Biblia keresése
            for (int i = 0; i < N; i++)
            {
                if (k[i].c == "Biblia" || k[i].c == "biblia")
                {
                    vanBiblia = true;
                    break;
                }
            }

            // Leghosszabb könyv oldalszám szerint
            int maxOldCimIndex = 0;
            for (int z = 1; z < N; z++)
            {
                if (k[z].o > k[maxOldCimIndex].o)
                {
                    maxOldCimIndex = z;
                }
            }

            // Leghosszabb cím
            int maxCimHosszIndex = 0;
            for (int z = 1; z < N; z++)
            {
                if (k[z].c.Length > k[maxCimHosszIndex].c.Length)
                {
                    maxCimHosszIndex = z;
                }
            }

            // Arany János könyvek száma
            int aranySzam = 0;
            for (int a = 0; a < N; a++)
            {
                if (k[a].sz == "Arany Janos" || k[a].sz == "arany janos" || k[a].sz == "Arany János" || k[a].sz == "arany jános")
                {
                    aranySzam++;
                }
            }

            // Összes oldal
            int osszesOldal = 0;
            for (int b = 0; b < N; b++)
            {
                osszesOldal += k[b].o;
            }

            // Petőfi könyvek indexei
            int petofiCounter = 0;
            for (int b = 0; b < N; b++)
            {
                if (k[b].sz == "Petofi Sandor" || k[b].sz == "petofi sandor" || k[b].sz == "Petőfi Sándor" || k[b].sz == "petőfi sándor")
                {
                    petofi[petofiCounter] = b;
                    petofiCounter++;
                }
            }

            // Fekete Gyémántok oldalszám
            int feketeGyemantokOldalSzam = 0;
            for (int a = 0; a < N; a++)
            {
                if (k[a].c == "Fekete Gyemantok" || k[a].c == "fekete gyemantok" || k[a].c == "Fekete Gyémántok" || k[a].c == "fekete gyémántok")
                {
                    feketeGyemantokOldalSzam = k[a].o;
                }
            }

            // Jókai leghosszabb című könyve
            int jokaiMaxCimId = -1;
            for (int b = 0; b < N; b++)
            {
                if (k[b].sz == "Jokai" || k[b].sz == "jokai" || k[b].sz == "Jókai" || k[b].sz == "jókai")
                {
                    if (jokaiMaxCimId == -1 || k[b].c.Length > k[jokaiMaxCimId].c.Length)
                    {
                        jokaiMaxCimId = b;
                    }
                }
            }

            // Kiírás
            Console.WriteLine("Biblia: " + (vanBiblia ? "van" : "nincs"));
            Console.WriteLine("A leghosszabb könyvnek a címe: " + k[maxOldCimIndex].c);
            Console.WriteLine("A leghosszabb című könyv címe: " + k[maxCimHosszIndex].c);
            Console.WriteLine("Összesen " + aranySzam + " Arany által írt könyv van.");
            Console.WriteLine("Az oldalak száma összesen " + osszesOldal + " oldal.");
            Console.WriteLine("Petőfi összes műve: ");
            for (int i = 0; i < petofiCounter; i++)
            {
                Console.Write(k[petofi[i]].c + ", ");
            }
            Console.WriteLine();
            Console.WriteLine("A Fekete Gyémántok összesen " + feketeGyemantokOldalSzam + " oldalas.");
            if (jokaiMaxCimId != -1)
            {
                Console.WriteLine("Jókai leghosszabb című könyve: " + k[jokaiMaxCimId].c + ".");
            }
        }
    }
}
