using System;
using System.Collections.Generic;

namespace ÉvfolyamZH
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<string> nevekEgyszer = new List<string>();
            List<int> kulonbozoSportok = new List<int>();

            string[] elsoSor = Console.ReadLine().Split();
            int S = int.Parse(elsoSor[0]);
            int N = int.Parse(elsoSor[1]);
            List<int> Sportok = new List<int>();
            List<string> Sportolok = new List<string>();
            int szam;
            for (int i = 0; i < N; i++)
            {
                string[] egysor = Console.ReadLine().Split();
                Sportolok.Add(egysor[0]);
                szam = int.Parse(egysor[1]);
                if (!nevekEgyszer.Contains(egysor[0]))
                {
                    nevekEgyszer.Add(egysor[0]);
                }
                if(!kulonbozoSportok.Contains(szam))
                {
                    kulonbozoSportok.Add(szam);
                }
                Sportok.Add(szam);
            }

            // 1. Részfeladat
            Console.WriteLine("#");

            int dbseged = 0;
            bool igazelsofeladat = false;
            for (int i = 0; i < nevekEgyszer.Count; i++)
            {
                dbseged = 0;
                for (int j = 0; j < N; j++)
                {
                    if (nevekEgyszer[i] == Sportolok[j])
                    {
                        dbseged++;
                    }
                }
                if (dbseged == 1)
                {
                    igazelsofeladat = true;
                    Console.WriteLine(nevekEgyszer[i]);
                    break;
                }
            }
            if (!igazelsofeladat)
            {
                Console.WriteLine();
            }

            // 2. Részfeladat

            Console.WriteLine("#");
            int dbseged2 = 0;
            int MaxDB = 0;
            string MaxNev = "";
            for (int i = 0; i < nevekEgyszer.Count; i++)
            {
                dbseged2 = 0;
                for (int j = 0; j < N; j++)
                {
                    if (nevekEgyszer[i] == Sportolok[j])
                    {
                        dbseged2++;
                    }
                }
                if (dbseged2 > MaxDB)
                {
                    MaxDB = dbseged2;
                    MaxNev = nevekEgyszer[i];
                }
            }
            Console.WriteLine(MaxNev);

            // 3. Részfeladat

            Console.WriteLine("#");

            List<int> darabok = new List<int>();
            int dbseged3 = 0;
            for (int i = 1; i <= S; i++)
            {
                dbseged3 = 0;
                for (int j = 0; j < Sportok.Count; j++)
                {
                    if (i == Sportok[j])
                    {
                        dbseged3++;
                    }
                }
                darabok.Add(dbseged3);
            }
            for (int i = 0; i < darabok.Count; i++)
            {
                Console.Write("{0} ", darabok[i]);
            }
            Console.WriteLine();
            // 4. Részfeladat

            Console.WriteLine("#");
            
            List<string> stringpar = new List<string>();
            List<string> nevek1 = new List<string>();
            List<string> nevek2 = new List<string>();
            bool vaneolyan = false;
            
            kulonbozoSportok.Sort();
            for (int i = 0; i < kulonbozoSportok.Count; i++)
            {
                for (int j = 0; j < kulonbozoSportok.Count; j++)
                {
                    if (kulonbozoSportok[i] != kulonbozoSportok[j])
                    {
                        if (!stringpar.Contains(kulonbozoSportok[j] + " " + kulonbozoSportok[i]))
                        {
                            nevek1 = new List<string>();
                            nevek2 = new List<string>();
                            vaneolyan = false;
                            for (int k = 0; k < Sportok.Count; k++)
                            {
                                if (kulonbozoSportok[i] == Sportok[k])
                                {
                                    nevek1.Add(Sportolok[k]);
                                }
                            }
                            for (int k = 0; k < Sportok.Count; k++)
                            {
                                if (kulonbozoSportok[j] == Sportok[k])
                                {
                                    nevek2.Add(Sportolok[k]);
                                }
                            }
                            for (int k = 0; k < nevek1.Count; k++)
                            {
                                if (nevek2.Contains(nevek1[k]))
                                {
                                    vaneolyan = true;
                                }
                            }
                            if (!vaneolyan)
                            {
                                stringpar.Add(kulonbozoSportok[i] + " " + kulonbozoSportok[j]);
                            }
                        }
                    }
                }
            }
           
            for (int i = 0; i < stringpar.Count; i++)
            { 
                Console.WriteLine(stringpar[i]);
            }
            // 5. Részfeladat
            Console.WriteLine("#");
            List<int> segeddb = new List<int>();
            List <string> voltemarstring = new List<string>();
            bool voltemar = false;
            int dbseged4 = 0;
            //nevekEgyszer.Sort();
            for (int i = 0; i < nevekEgyszer.Count; i++)
            {
                segeddb = new List<int>();
                for (int j = 0; j < Sportok.Count; j++)
                {
                    if (Sportolok[j] == nevekEgyszer[i])
                    {
                        segeddb.Add(Sportok[j]);
                    }
                }

                voltemarstring = new List<string>();
                voltemarstring.Add(nevekEgyszer[i]);
                dbseged4 = 0;
                for (int k = 0; k < Sportok.Count; k++)
                {
                    voltemar = false;
                    if (voltemarstring.Contains(Sportolok[k]))
                    {
                        voltemar = true;
                    }
                    if (segeddb.Contains(Sportok[k]) && !voltemar)
                    {
                        dbseged4++;
                        voltemarstring.Add(Sportolok[k]);
                    }
                }
                Console.WriteLine("{0} {1}", nevekEgyszer[i], dbseged4);
            }
           
        }
    }
}