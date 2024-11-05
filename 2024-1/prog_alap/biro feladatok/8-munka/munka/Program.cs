using System;
namespace munka
{
    internal class Program
    {
        const int maxn = 100;
        struct Beadat
        {
            public int cegszam;
            public int kozvetites;
            public int szul;
            public int nem;
        }
        static void Main(string[] args)
        {


            Console.Error.WriteLine("Kérem a [cégek] [közvetítések számát]\tV: ");
            string[] tmp = Console.ReadLine().Split(" ");
            int cegekszam = Int32.Parse(tmp[0]);
            int kozvetitesszam = Int32.Parse(tmp[1]);
            Beadat[] k = new Beadat[maxn];
            for (int i = 0; i < kozvetitesszam; i++)
            {
                Console.Error.WriteLine($"Kérem a {i + 1}. adatot: [cegszam] [kozvetites szam] [szuletesi ev] [nem]\tV: ");
                tmp = Console.ReadLine().Split(" ");
                k[i].cegszam = Int32.Parse(tmp[0]);
                k[i].kozvetites = Int32.Parse(tmp[1]);
                k[i].szul = Int32.Parse(tmp[2]);
                k[i].nem = Int32.Parse(tmp[3]);
            }
            //feladatok:
            int holgy = 0;
            int ur = 0;
            for (int i = 0; i < kozvetitesszam; i++)
            {
                if (k[i].nem == 0)
                {
                    holgy++;
                }
                else if (k[i].nem == 1)
                {
                    ur++;
                }
            }
            Console.Write($"{holgy} {ur}\n");

            //masodik feladat
            int egyediekszama = 0;
            for (int i = 0; i < kozvetitesszam; i++)
            {
                bool egyedi = true;
                for (int j = 0; j < i; j++)
                {
                    if (k[i].cegszam == k[j].cegszam)
                    {
                        egyedi = false;
                    }
                }
                if (egyedi) { egyediekszama++; }
            }
            Console.WriteLine(egyediekszama);

            // harmadik
            int[] cegek = new int[cegekszam];
            for (int i = 0; i < kozvetitesszam; i++)
            {
                cegek[k[i].cegszam - 1]++;
            }
            Console.Write($"{cegek[0]}");

            for (int i = 1; i < cegekszam; i++)
            {
                Console.Write($" {cegek[i]}");
            }

            // negyedi feladat
            int[] rendezettszul = new int[kozvetitesszam];

            for (int i = 0; i < kozvetitesszam; i++)
            {
                rendezettszul[i] = i;
            }
            for (int j = 0; j < kozvetitesszam - 1; j++)
            {
                for (int i = 0; i < kozvetitesszam - j - 1; i++)
                {
                    if (k[rendezettszul[i]].szul > k[rendezettszul[i + 1]].szul)
                    {
                        int temp = rendezettszul[i];
                        rendezettszul[i] = rendezettszul[i + 1];
                        rendezettszul[i + 1] = temp;
                    }
                    else if (k[rendezettszul[i]].szul == k[rendezettszul[i + 1]].szul && k[rendezettszul[i]].nem > k[rendezettszul[i + 1]].nem)
                    {
                        int temp = rendezettszul[i];
                        rendezettszul[i] = rendezettszul[i + 1];
                        rendezettszul[i + 1] = temp;
                    }
                }
            }
            Console.Write($"\n{rendezettszul[0] + 1}");
            for (int i = 1; i < kozvetitesszam; i++)
            {
                Console.Write($" {rendezettszul[i] + 1}");
            }
            //mire az utolsóban megtaláltam a hibámat lement a nap xd
            //btw létezik sort funkció is
        }
    }
}