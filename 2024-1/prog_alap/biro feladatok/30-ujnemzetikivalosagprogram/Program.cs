using System;
using System.Collections.Generic;
namespace UjNemzetiKivalosagProgram
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] elsosor = Console.ReadLine().Split(" ");
            int N = int.Parse(elsosor[0]);
            int P = int.Parse(elsosor[1]);
            List<int> Pontok = new List<int>();
            List<string> nevek = new List<string>();
            List<string> nevekEgyszer = new List<string>();

            string nevbe = "";
            for (int i = 0; i < N; i++)
            {
                nevbe = "";
                string[] tobbisor = Console.ReadLine().Split(" ");
                Pontok.Add(int.Parse(tobbisor[0]));
                if(tobbisor.Length == 2)
                { 
                    nevbe = tobbisor[1];
                }
                else
                {
                    nevbe = tobbisor[1] + " " + tobbisor[2];
                }
                nevek.Add(nevbe);
                if (!nevekEgyszer.Contains(nevbe))
                {
                    nevekEgyszer.Add(nevbe);
                }
            }

            int maxpont = 0;
            string maxpontnev = "";
            for (int i = 0; i < N; i++)
            {
                if(Pontok[i] > maxpont)
                {
                    maxpont = Pontok[i];
                    maxpontnev = nevek[i];
                }
            }
            Console.WriteLine("#");
            Console.WriteLine(maxpontnev);
            
            Console.WriteLine("#");
            Console.WriteLine(nevekEgyszer.Count);
            int osszpont = 0;
            for (int i = 0; i < nevekEgyszer.Count; i++)
            {
                osszpont = 0;
                for (int j = 0; j < N; j++)
                {
                    if (nevekEgyszer[i] == nevek[j])
                    {
                        osszpont += Pontok[j];
                    }
                }
                Console.WriteLine("{0} {1}", nevekEgyszer[i],osszpont);
            }
            
            Console.WriteLine("#");
            int dbnev = 0;
            bool vanE = false;
            bool igazE = true;
            int segedharom = 0;
            string nev = "";
            for (int i = 0; i < nevekEgyszer.Count; i++)
            {
                segedharom = 0;
                dbnev = 0;
                igazE = true;
                if (!vanE)
                {
                    for (int j = 0; j < N; j++)
                    {
                        if (nevekEgyszer[i] == nevek[j])
                        {
                            dbnev++;
                            if(dbnev == 1)
                            {
                                segedharom = Pontok[j];
                            }
                            if (dbnev >= 2)
                            {
                                
                                if (Pontok[j] > segedharom)
                                {
                                    segedharom = Pontok[j];
                                }
                                else
                                {
                                    igazE = false;
                                }
                                
                            }
                        }
                    }
                }
                if(dbnev < 2)
                {
                    igazE = false;
                }
                if (igazE)
                {
                    vanE = true;
                    nev = nevekEgyszer[i];
                    break;
                }
            }
            if (vanE)
            {
                Console.WriteLine("{0}",nev);
            }
            else
            {
                Console.WriteLine("NINCS");
            }
            
            Console.WriteLine("#");
            List<string> nevekPontFelett = new List<string>();
            for (int i = 0; i < N; i++)
            {
                if (Pontok[i] > P)
                {
                    if (!nevekPontFelett.Contains(nevek[i]))
                    {
                        nevekPontFelett.Add(nevek[i]);
                    }
                }
            }
            Console.WriteLine(nevekPontFelett.Count);
            for (int i = 0; i < nevekPontFelett.Count; i++)
            {
                Console.WriteLine(nevekPontFelett[i]);
            }
            
        }
    }
}