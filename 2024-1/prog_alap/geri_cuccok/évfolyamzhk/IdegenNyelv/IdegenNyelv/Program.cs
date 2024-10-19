using System;
using System.Collections.Generic;
using System.Numerics;
using System.Security.Cryptography;
using System.Linq;

namespace IdegenNyelv
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Bemenet

            string[] elsosor = Console.ReadLine().Split(" ");
            int N = int.Parse(elsosor[0]);
            int M = int.Parse(elsosor[1]);
            List<string> nyelvek = new List<string>();
            List<string> nyelvekEgyszer = new List<string>();
            List<int> dolgozok = new List<int>();
            string nyelv = "";
            for(int i = 1; i <= M * 2; i++)
            {
                if(i % 2 == 0)
                {
                    nyelv = Console.ReadLine(); 
                    nyelvek.Add(nyelv);
                    if(!nyelvekEgyszer.Contains(nyelv))
                    {
                        nyelvekEgyszer.Add(nyelv);
                    }
                }
                else
                {
                    dolgozok.Add(int.Parse(Console.ReadLine()));
                }
            }

            // 1. Részfeladat

            Console.WriteLine("#");
            Console.WriteLine(nyelvekEgyszer.Count);

            // 2. Részfeladat

            Console.WriteLine("#");
            int dbseged = 0;
            List<string> Sor2 = new List<string>();
            List<List<string>> NyelvekDolgozonkent = new List<List<string>>();
            for (int i = 1; i <= N; i++)
            {
                dbseged = 0;
                Sor2 = new List<string>();
                for (int j = 0; j < M; j++)
                {
                    if (dolgozok[j] == i)
                    {
                        dbseged++;
                        Sor2.Add(nyelvek[j]);
                    }
                }
                if(dbseged != 0)
                {
                    Console.WriteLine("{0} {1}",i,dbseged);
                    Sor2.Sort();
                    NyelvekDolgozonkent.Add(Sor2);
                }
            }

            // 3. Részfeladat

            Console.WriteLine("#");
            string legtobbnyelv = "";
            int legtobbDB = 0;
            int nyelvdbseged = 0;
            

            for (int i = 0; i < nyelvekEgyszer.Count; i++)
            {
                nyelvdbseged = 0;
                for (int j = 0; j < M; j++)
                {
                    if (nyelvekEgyszer[i] == nyelvek[j])
                    {
                        nyelvdbseged++;
                    }
                }
                if(nyelvdbseged > legtobbDB)
                {
                    legtobbDB = nyelvdbseged;
                    legtobbnyelv = nyelvekEgyszer[i];
                }
            }
            Console.WriteLine(legtobbnyelv);

            // 4. Részfeladat

            Console.WriteLine("#");
            int index = 1;
            bool VanE = false;
            int dolgozoAkinemtud = 0;
            int dbseged2 = 0;
            while (index <= N && !VanE)
            {
                dbseged2 = 0;
                for (int i = 0; i < M; i++)
                {
                    if (dolgozok[i] == index)
                    {
                        dbseged2++;
                    }
                }
                if (dbseged2 == 0)
                {
                    VanE = true;
                    dolgozoAkinemtud = index;
                }
                index++;
            }
            if(VanE)
            {
                Console.WriteLine(dolgozoAkinemtud);
            }
            else
            {
                Console.WriteLine("-1");
            }

            // 5. Részfeladat

            Console.WriteLine("#");

            List<List<string>> csoportok = new List<List<string>>();
            bool Vaneolyan = false;
            for (int i = 0; i < NyelvekDolgozonkent.Count; i++)
            {
                Vaneolyan = false;
                for (int j = 0; j < csoportok.Count; j++)
                {
                    if (csoportok[j].SequenceEqual(NyelvekDolgozonkent[i]))
                    {
                        Vaneolyan = true;
                    }
                }
                if(!Vaneolyan)
                {
                    csoportok.Add(NyelvekDolgozonkent[i]);
                }
            }
            Console.WriteLine(csoportok.Count);
        }
    }
}