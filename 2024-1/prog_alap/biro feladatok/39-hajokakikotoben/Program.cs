using System;
using System.Collections.Generic;

namespace HajokAKikotoben
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] elsosor = Console.ReadLine().Split(' ');
            int N = int.Parse(elsosor[0]);
            int M = int.Parse(elsosor[1]);

            List<int> hajok = new List<int>();
            List<int> hajokNapjaiEgyszer = new List<int>();
            int szam = 0;

            for(int i = 0; i < N; i++)
            {
                szam = int.Parse(Console.ReadLine());    
                hajok.Add(szam);
                if(!hajokNapjaiEgyszer.Contains(szam))
                {
                    hajokNapjaiEgyszer.Add(szam);
                }
            }

            // 1. Részfeladat

            Console.WriteLine("#");
            int darabnincs = 0;
            for (int i = 1; i <= M; i++)
            {
                if(!hajokNapjaiEgyszer.Contains(i))
                {
                    darabnincs++;
                }
            }
            Console.WriteLine(darabnincs);

            // 2. Részfeladat

            Console.WriteLine("#");
            bool vanEilyen = false;
            int napid = 0;
            for(int i = 2; i <= M - 1; i++)
            {
                if (hajokNapjaiEgyszer.Contains(i) && !hajokNapjaiEgyszer.Contains(i - 1) && !hajokNapjaiEgyszer.Contains(i + 1))
                {
                    vanEilyen = true;
                    napid = i;
                    break;
                }
            }
            if(!vanEilyen)
            {
                Console.WriteLine("-1");
            }
            else
            {
                Console.WriteLine(napid);
            }

            // 3. Részfeladat

            Console.WriteLine("#");

            int leghosszabbnap = 0;
            int segednap = 0;
            for (int i = 1; i <= M; i++)
            {
                if(!hajokNapjaiEgyszer.Contains(i) && i == M)
                {
                    segednap++;
                    if (segednap > leghosszabbnap)
                    {
                        leghosszabbnap = segednap;
                    }
                    segednap = 0;
                }
                else if(!hajokNapjaiEgyszer.Contains(i))
                {
                    segednap++;
                }
                else
                {
                    if(segednap > leghosszabbnap)
                    {
                        leghosszabbnap = segednap;
                    }
                    segednap = 0;
                }
            }
            
            Console.WriteLine(leghosszabbnap);
            
            // 4. Részfeladat

            Console.WriteLine("#");

            int dbmax = 0;
            int dbid = 0;
            int dbseged = 0;
            foreach(int a in hajokNapjaiEgyszer)
            {
                foreach(int b in hajok)
                {
                    if(a == b)
                    {
                        dbseged++;
                    }
                }
                if(dbseged > dbmax)
                {
                    dbmax = dbseged;
                    dbid = a;
                }
                dbseged = 0;
            }
            Console.WriteLine(dbid);

            // 5. Részfeladat

            Console.WriteLine("#");
            List<int> napokotos = new List<int>();
            List<int> segednapok = new List<int>();
            if(leghosszabbnap == 0)
            {
                Console.WriteLine("{0} {1}", hajokNapjaiEgyszer[0], hajokNapjaiEgyszer[hajokNapjaiEgyszer.Count - 1]);
            }
            else
            {
                for (int i = 1; i <= M; i++)
                {
                    if (hajokNapjaiEgyszer.Contains(i) && i == M)
                    {
                        segednapok.Add(i);
                        if (segednapok.Count > napokotos.Count)
                        {
                            napokotos = segednapok;
                        }
                        segednapok = new List<int>();
                    }
                    else if (hajokNapjaiEgyszer.Contains(i))
                    {
                        segednapok.Add(i);
                    }
                    else
                    {
                        if (segednapok.Count > napokotos.Count)
                        {
                            napokotos = segednapok;
                        }
                        segednapok = new List<int>();
                    }
                }
            }
            if (napokotos.Count > 1)
            {
                Console.WriteLine("{0} {1}", napokotos[0], napokotos[napokotos.Count - 1]);
            }
            else if(napokotos.Count == 1)
            {
                Console.WriteLine("{0} {0}", napokotos[0]);
            }
        }
    }
}