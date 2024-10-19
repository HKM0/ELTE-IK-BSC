using System;
using System.Collections.Generic;
namespace Bor
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //beolvasas

            int evekszama;
            
            do
            {
                evekszama = int.Parse(Console.ReadLine());
            } while (evekszama < 1 || evekszama > 100);
            
            int[] mennyisegek=new int[evekszama];
            int[] arak=new int[evekszama];
            
            for (int i = 0; i < evekszama; i++)
            {
                string[] adat= Console.ReadLine().Split(' ');
                mennyisegek[i] = int.Parse(adat[0]);
                arak[i] = int.Parse(adat[1]);
            }
            
            //A feladat

            int sorszamaA = 1;
            int minimumA = mennyisegek[0];
            for(int i = 0; i < evekszama; i++)
            {
                if (mennyisegek[i] < minimumA)
                { 
                    sorszamaA=i+1;
                    minimumA=mennyisegek[i];
                }
            }
            Console.WriteLine(sorszamaA);

            //B Feladat

            List<int> arak1000L = new List<int>();
            int DbB = 0;
            for (int i = 0; i < evekszama; i++)
            {
                if (mennyisegek[i] > 1000)
                {
                    arak1000L.Add(arak[i]);
                    DbB++;
                }
            }
            if(DbB == 0)
            {
                Console.WriteLine("-1");
            }
            else
            {
                int maximumB = arak1000L[0];
                for (int i = 1; i < arak1000L.Count; i++)
                {
                    if(arak1000L[i]>maximumB)
                    {
                        maximumB = arak1000L[i];
                    }
                }
                Console.WriteLine(maximumB);
            }

            // C feladat
            
            List<int> KulonbozoArak = new List<int>();
            int osszesAr = 0;
            bool igazE;

            for (int i = 0; i < evekszama; i++)
            {
                if (osszesAr == 0)
                {
                    KulonbozoArak.Add(arak[i]);
                    osszesAr++;
                }
                else
                {
                    igazE = false;
                    for (int j = 0; j < osszesAr; j++)
                    {
                        if (KulonbozoArak[j] == arak[i])
                        {
                            igazE=true;
                        }
                    }
                    if (!igazE)
                    {
                        KulonbozoArak.Add(arak[i]);
                        osszesAr++;
                    }
                }
            }
            Console.WriteLine(KulonbozoArak.Count);

            // D feladat

            List<int> sorszamD = new List<int>();
            bool nagyobbE=true;

            for (int i = 1; i < evekszama; i++)
            {
                nagyobbE = true;
                for (int j = 0; j < i; j++)
                {
                    if (mennyisegek[j] > mennyisegek[i])
                    {
                        nagyobbE = false;
                    }
                }
                if (nagyobbE)
                {
                    sorszamD.Add(i + 1);
                }
            }

            Console.Write("{0} ",sorszamD.Count);
            for (int i = 0; i < sorszamD.Count; i++)
            {
                Console.Write("{0} ",sorszamD[i]);
            }
        }
    }
}