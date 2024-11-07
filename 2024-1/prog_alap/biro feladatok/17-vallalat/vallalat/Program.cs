using System;
namespace vallalat
{
    internal class Program
    {
        const int maxn = 300*500;
        struct Beadat
        {
            public int ugyfelid;
            public int nap;
        }
        static void Main(string[] args)
        {
            Console.Error.WriteLine("Kérem a(z) [ügyfelek] [napok] [megrendelések számát]\tV: ");
            string[] tmp = Console.ReadLine().Split(" ");
            int ugyfelekszama = Int32.Parse(tmp[0]);
            int napokszama = Int32.Parse(tmp[1]);
            int megrendelesekszama = Int32.Parse(tmp[2]);
            Beadat[] k = new Beadat[maxn];
            int[] napoklista = new int[napokszama];
            int[] ugyfeleklista = new int[ugyfelekszama];
            for (int i = 0; i< megrendelesekszama; i++)
            {
                Console.Error.WriteLine($"Kérem a(z) {i+1}. megrendelést\tV: ");
                tmp = Console.ReadLine().Split(" ");
                k[i].ugyfelid = Int32.Parse(tmp[0]);
                k[i].nap = Int32.Parse(tmp[1]);
                napoklista[k[i].nap - 1]++;
                ugyfeleklista[k[i].ugyfelid - 1]++;
            }
            //elso fealadata:
            int min1rendelesszamlalo = 0;
            int maxgepszamid = 0;
            for (int i = 0; i< napokszama; i++)
            {
                if (napoklista[i] >= 1)
                {
                    min1rendelesszamlalo++;
                }
                if (napoklista[i] > napoklista[maxgepszamid])
                {
                    maxgepszamid = i;
                }
            }
            Console.WriteLine(napoklista[maxgepszamid]);

            //masodik feladat:
            Console.Write($"{min1rendelesszamlalo}");
            for (int i = 0; i< napokszama; i++)
            {
                if (napoklista[i] >= 1)
                {
                    Console.Write($" {i+1}");
                }
            }
            //harmadik feladat: 
            int legtobbetrendeltid = 0;
            int maxrendelokszama = 0;
            for (int i = 1; i < ugyfelekszama; i++)
            {
                if (ugyfeleklista[i] > ugyfeleklista[legtobbetrendeltid])
                {
                    legtobbetrendeltid = i;
                    maxrendelokszama = 0;
                }
                else if (ugyfeleklista[i] == ugyfeleklista[legtobbetrendeltid])
                {
                    maxrendelokszama++;
                }
            }
            int maxrendeles = ugyfeleklista[legtobbetrendeltid];
            Console.Write($"\n{maxrendelokszama + 1}");
            for (int i = 0; i< ugyfelekszama; i++)
            {
                if (ugyfeleklista[i] == maxrendeles)
                {
                    Console.Write($" {i+1}");
                }
            }
            //negyedik feladat: 
            int megoldas_elso=0;
            int megoldas_utolso = 0;
            int elsoid = -1;
            int max_hossz = 0;
            int aktualis_hossz = 0;
            for (int i = 0; i< napokszama; i++)
            {
                if (napoklista[i] >= 1)
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
            Console.WriteLine($"\n{megoldas_elso+1} {megoldas_utolso+1}");

            //ötödik feladat: 
            int[,] ugyfeleknaponta = new int[napokszama, ugyfelekszama];
            for (int i = 0; i< megrendelesekszama; i++)
            {
                ugyfeleknaponta[k[i].nap-1, k[i].ugyfelid -1] = 1;
            }
            int kulonbozougyfelekmax = 0;
            int kezdonap = 0;

            for(int i = 0; i< napokszama -1; i++)
            {
                int kulonbozougyfelek = 0;
                for (int j = 0; j < ugyfelekszama; j++)
                {
                    if (ugyfeleknaponta[i, j] == 1 || ugyfeleknaponta[i + 1, j] == 1)
                    {
                        kulonbozougyfelek += 1;
                    }
                }
                if (kulonbozougyfelek > kulonbozougyfelekmax)
                {
                    kulonbozougyfelekmax = kulonbozougyfelek;
                    kezdonap = i;
                }
            }
            Console.WriteLine($"{kezdonap+1} {kulonbozougyfelekmax}");

            //ez a feladat szopás
        }
    }
}
