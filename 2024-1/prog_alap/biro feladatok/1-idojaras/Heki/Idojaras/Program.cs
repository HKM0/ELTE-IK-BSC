using System;

namespace Idojaras
{
    internal class Program
    {
        const int maxn = 100;
        struct Beadat
        {
            public int min;
            public int max;
        }
        static void Main(string[] args)
        {

            //adatrendezés
            Beadat[] k = new Beadat[maxn];
            Console.Error.WriteLine("Hány nap legyen? \tV: ");
            int napszam = Int32.Parse(Console.ReadLine());
            for (int i = 0; i < napszam; i++)
            {
                Console.Error.WriteLine($"Add meg a(z) {i + 1}. nap [legalacsonyabb] [legmagasabb] értékét: ");
                string[] tmp = Console.ReadLine().Split(' ');
                k[i].min = Int32.Parse(tmp[0]);
                k[i].max = Int32.Parse(tmp[1]);
            }

            /*1.részfeladat: azon napok számát kell kiírni, amikor fagyi fog!*/
            Console.WriteLine("#");
            int FagyixD = 0;
            for (int i = 0; i < napszam; i++)
            {
                if (k[i].min <= 0)
                {
                    FagyixD++;
                }
            }
            Console.WriteLine(FagyixD);
            /*
            2. részfeladat: azt a napot kell kiírni, ahol a legnagyobb a különbség a várható minimális és 
            maximális hőmérséklet között(ha több ilyen van, akkor a legkisebb sorszámút)!*/
            Console.WriteLine("#");
            int max_kulonbseg_index = 0; 
            int max_kulonbseg = k[0].max - k[0].min; 
            for (int i = 1; i < napszam; i++) 
            {
                int kulonbseg = k[i].max - k[i].min; 
                if (kulonbseg > max_kulonbseg) 
                {
                    max_kulonbseg_index = i; 
                    max_kulonbseg = kulonbseg; 
                }
            }
            Console.WriteLine(max_kulonbseg_index + 1);

            /*
             3. részfeladat: egy olyan napot kell kiírni, amikor a napi maximum kissebb az előző napi minimumnál
                (ha több ilyen van, akkor a legkisebb sorszámút; -1 -et, ha nincs ilyen nap) */
            Console.WriteLine("#");
            int melyiknap = -1;
            for (int i = 1; i < napszam; i++)
            {
                if (k[i - 1].min > k[i].max)
                {
                    if (melyiknap == -1)
                    {
                        melyiknap = i+1;
                    }
                }
            }
            Console.WriteLine(melyiknap); 

            /*
             4. részfeladat: azon napok számát és sorszámait kell kiírni, ahol fagyni is fog és olvadni is (a sorszá-
                mokat növekvő sorrendben) egy-egy szóközzel elválasztva!*/
            Console.WriteLine("#");
            int[] elolvadok_mert_cukorbol_vagyok_xD = new int[napszam];
            int hanynapon = 0;
            for (int i = 0; i < napszam; i++)
            {
                if (k[i].min <= 0 && k[i].max > 0)
                {
                    elolvadok_mert_cukorbol_vagyok_xD[hanynapon] = i + 1;
                    hanynapon++;
                }
            }
            Console.Write(hanynapon);
            for (int i = 0; i < hanynapon; i++)
            {
                Console.Write($" {elolvadok_mert_cukorbol_vagyok_xD[i]}");
            }
            //kb 15p
        }
    }
}
