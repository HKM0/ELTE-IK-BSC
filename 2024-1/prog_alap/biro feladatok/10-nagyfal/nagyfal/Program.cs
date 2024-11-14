using System;

namespace nagyfal
{
    internal class Program
    {
        const int maxn = 1000;

        static void Main(string[] args)
        {
            //beolvasás
            Console.Error.WriteLine("Kérem az őrhelyek számát\tV: ");
            int orhelyekszama = Int32.Parse(Console.ReadLine());
            int[] orhely = new int[maxn];
            for (int i = 0; i < orhelyekszama; i++)
            {
                Console.Error.WriteLine($"Kérem a(z) {i + 1}. őrhely őreinek számát\tV: ");
                orhely[i] = Int32.Parse(Console.ReadLine());
            }

            //feladatok:
            //a) az őrzött falszakaszok számát;
            int[] falszakaszok = new int[orhelyekszama - 1];
            if (orhely[0] > 0) { falszakaszok[0]++; }
            if (orhely[orhelyekszama - 1] > 0) { falszakaszok[orhelyekszama - 2]++; }
            for (int i = 1; i < orhelyekszama - 1; i++)
            {
                if (orhely[i] > 0)
                {
                    falszakaszok[i - 1]++;
                    falszakaszok[i]++;
                }
            }

            int orzottek = 0;
            for (int i = 0; i < orhelyekszama - 1; i++)
            {
                if (falszakaszok[i] >= 1)
                {
                    orzottek++;
                }
            }
            Console.WriteLine(orzottek);

            //b) hány helyre kell még őrt küldeni, hogy minden falszakasz őrzött legyen;
            int hanyorkellmeg = 0;
            for (int i = 0; i < orhelyekszama - 1; i++)
            {
                if (falszakaszok[i] == 0)
                {
                    hanyorkellmeg++;
                    if (i + 1 < orhelyekszama - 1 && falszakaszok[i + 1] == 0)
                    {
                        i++;
                    }
                }
            }
            Console.WriteLine(hanyorkellmeg);

            /*c) a legelső olyan falszakasz sorszámát, ami nem őrzött és nem védett 
                (0-t kell kiírni, ha nem volt ilyen falszakasz); */
            int melyik = 0;
            for (int i = 0; i < orhelyekszama - 1; i++)
            {
                if (falszakaszok[i] == 0)
                {
                    melyik = i + 1; 
                    break;
                }
            }
            Console.WriteLine(melyik);


            /* d) a leghosszabb falszakasz sorozat első és utolsó őrének helyét, 
             amely folyamatosan védett (ha több ilyen volt, akkor a legkisebb első sorszámút, 
                ha nem volt ilyen, akkor egy 0 számot kell kiírni)! */
            int megoldas_elso = 0;
            int megoldas_utolso = 0;
            int max_hossz = 0;
            int aktualis_hossz = 0;
            int elsoid = -1;
            for (int i = 0; i < orhelyekszama - 1; i++)
            {
                if (falszakaszok[i] == 2)
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
            if (max_hossz > 0)
            {
                Console.WriteLine($"{megoldas_elso + 1} {megoldas_utolso + 2}");
            }
            else
            {
                Console.WriteLine(0);
            }
        }
    }
}
