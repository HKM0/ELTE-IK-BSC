using System;
namespace muzeum
{
    internal class Program
    {
        const int maxn = 1001;
        struct beadat
        {
            public int kezd;
            public int vege;
        }

        static void Main(string[] args)
        {
            beadat[] k = new beadat[maxn];
            Console.Error.WriteLine("Kérem a [napok] [dolgozók számát]\tV: ");
            string[] tmp = Console.ReadLine().Split(" ");
            int napokszama = Int32.Parse(tmp[0]);
            int dolgozokszama = Int32.Parse(tmp[1]);
            for (int i = 0; i < dolgozokszama; i++)
            {
                Console.Error.WriteLine($"Kérem a(z) {i+1}. őr adatait, [kezdés] [vége]\tV: ");
                tmp = Console.ReadLine().Split(" ");
                k[i].kezd = Int32.Parse(tmp[0]);
                k[i].vege = Int32.Parse(tmp[1]);
            }
            // feladatok:
            /* a) a leghosszabb ideig szolgálatban volt őr hány napot őrködött; */
            int legszorgalmasabbid = 0;
            for (int i = 1; i < dolgozokszama; i++) { 
                if ((k[i].vege - k[i].kezd + 1) > (k[legszorgalmasabbid].vege - k[legszorgalmasabbid].kezd + 1))
                {
                    legszorgalmasabbid = i;
                }
            }
            Console.WriteLine(k[legszorgalmasabbid].vege - k[legszorgalmasabbid].kezd + 1);

            /* b) az egyes napokon hány őr volt szolgálatban; */
            int[] napok = new int[napokszama];
            for (int i = 0; i < dolgozokszama; i++)
            {
                for (int j = (k[i].kezd-1); j <= (k[i].vege-1); j++)
                {
                    napok[j] += 1;
                }
            }
            Console.Write(napok[0]);
            for (int i = 1; i < napokszama; i++)
            {
                Console.Write($" {napok[i]}");
            }

            /* c) azon nap sorszámát, amikor a legtöbb őr volt szolgálatban (ha több ilyen van, akkor a legkisebb sorszámút kell megadni);*/
            int maxorszamid = 0;
            for (int i = 1; i < napokszama; i++) { 
                if (napok[i] > napok[maxorszamid])
                {
                    maxorszamid = i;
                }
            }
            Console.WriteLine($"\n{maxorszamid+1}");

            /* d) a leghosszabb sorozat első és utolsó napját, amikor minden nap kettőnél kevesebb őr volt szolgálatban (ha több ilyen volt, 
                akkor a legkisebb első napút, ha nem volt ilyen, akkor egy 0 számot kell kiírni)!*/
            int megoldas_elso = 0;
            int megoldas_utolso = 0;
            int elsoid = -1;
            int max_hossz = 0;
            int aktualis_hossz = 0;

            for (int i = 0; i < napokszama; i++)
            {
                if (napok[i] < 2)
                {
                    if (aktualis_hossz == 0)
                    {
                        elsoid = i;
                    }
                    aktualis_hossz++;
                    if (aktualis_hossz > max_hossz)
                    {
                        max_hossz = aktualis_hossz;
                        megoldas_elso = elsoid;
                        megoldas_utolso = i;
                    }
                }
                else
                {
                    aktualis_hossz = 0;
                }
            }
            if (max_hossz == 0)
            {
                Console.WriteLine(0);
            }
            else
            {
                Console.WriteLine($"{megoldas_elso + 1} {megoldas_utolso + 1}");
            }
        }
    }
}
