using System;
namespace forgalom
{
    internal class Program
    {
        const int maxn = 1500;
        struct Beadat
        {
            public int nap;
            public int uzlet;
            public int termek;
        }
        static void Main(string[] args)
        {
            Beadat[] k = new Beadat[maxn];
            Console.Error.WriteLine("Kérem a(z) [napok] [üzletek] [jelentések számát]\tV: ");
            string[] tmp = Console.ReadLine().Split(" ");
            int napszam = Int32.Parse(tmp[0]);
            int uzletszam= Int32.Parse(tmp[1]);
            int jelentesszam = Int32.Parse(tmp[2]);
            for (int i = 0; i< jelentesszam; i++)
            {
                Console.Error.WriteLine($"Kérem a(z) {i+1}. jeltenést\tV: ");
                tmp = Console.ReadLine().Split(" ");
                k[i].nap = Int32.Parse(tmp[0]);
                k[i].uzlet = Int32.Parse(tmp[1]);
                k[i].termek = Int32.Parse(tmp[2]);
            }
            //fealadatok: 
            //elso feladat
            int bojler = 0;
            for (int i = 0; i < jelentesszam; i++)
            {
                if (k[i].termek > k[bojler].termek)
                {
                    bojler = i;
                }
            }
            Console.WriteLine(k[bojler].termek);
            //masodik feladat
            int szamlalo = 0;
            for(int i = 0; i< jelentesszam; i++)
            {
                bool egyedi = true;
                for (int j = 0; j < i; j++)
                {
                    if (k[i].nap == k[j].nap)
                    {
                        egyedi = false;
                    }
                }
                if (egyedi) {
                    szamlalo++;
                }
            }
            Console.WriteLine(szamlalo);
            // haramdik feladat
            int[] uzletekalkalom = new int[uzletszam];
            int[] uzleteladott = new int[uzletszam];
            int[] napok = new int[napszam];
            for (int i = 0; i< jelentesszam; i++)
            {
                uzletekalkalom[k[i].uzlet-1]++;
                uzleteladott[k[i].uzlet - 1] += k[i].termek;
                napok[k[i].nap - 1]++;
            }
            int maxid = 0;
            for (int i = 0; i < uzletszam; i++)
            {
                if (uzletekalkalom[i] > uzletekalkalom[maxid])
                {
                    maxid = i;
                }
            }
            Console.WriteLine($"{maxid+1} {uzletekalkalom[maxid]}");
            //negyedik feladat
            /*a leghosszabb időintervallum kezdő és végző napját, amikor minden nap legalább egy
                üzletben adtak el a termékből (ha több ilyen volt, akkor a legkisebb első napút, kell kiírni)!*/
            int megoldas_elso = 0;
            int megoldas_utolso = 0;
            int elsoid = -1;
            int max_hossz = 0;
            int aktualis_hossz = 0;

            for (int i = 0; i < napszam; i++)
            {
                if (napok[i] >= 1)
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
            Console.WriteLine($"{megoldas_elso + 1} {megoldas_utolso + 1}");
            
        }
    }
}
