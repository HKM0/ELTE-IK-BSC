using System;
using System.Collections.Generic;
namespace KalapacsvetoVerseny
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int N = int.Parse(Console.ReadLine());
            List<List<int>> matrix = new List<List<int>>();
            List<int> sor = new List<int>();
            for (int i = 0; i < N; i++)
            {
                sor = new List<int>();
                string[] sorszoveg = Console.ReadLine().Split(" ");
                sor.Add(int.Parse(sorszoveg[0]));
                sor.Add(int.Parse(sorszoveg[1]));
                sor.Add(int.Parse(sorszoveg[2]));
                sor.Add(int.Parse(sorszoveg[3]));
                sor.Add(int.Parse(sorszoveg[4]));
                sor.Add(int.Parse(sorszoveg[5]));
                matrix.Add(sor);
            }
            // Feladatok

            List<int> legnagyobbDobasok = new List<int>();
            List<int> sikeresDobasok = new List<int>();
            List<int> indexek = new List<int>();
            List<int> megbizhato = new List<int>();
            List<int> sormax = new List<int>();
            int maxseged = 0;
            int dbseged = 0;
            int index = 0;
            int dbmegbizhato = 0;
            int minimummegbizhato = 9001;
            int maximummegbizhato = 0;
            int maxert = 0;
            int maxid = 0;
            for (int i = 0; i < N; i++)
            {
                index = 0;
                maxseged = 0;
                dbseged = 0;
                minimummegbizhato = 9001;
                maximummegbizhato = 0;
                for (int j = 0; j < matrix[i].Count; j++)
                {
                    if (matrix[i][j] > maxseged)
                    {
                        maxseged = matrix[i][j];
                    }
                    if (matrix[i][j] != -1)
                    {
                        dbseged++;
                        index = j + 1;
                    }
                    if (matrix[i][j] < minimummegbizhato)
                    {
                        minimummegbizhato = matrix[i][j];
                    }
                    if (matrix[i][j] > maximummegbizhato)
                    {
                        maximummegbizhato = matrix[i][j];
                    }
                }
                legnagyobbDobasok.Add(maxseged);
                sikeresDobasok.Add(dbseged);
                indexek.Add(index);
                if (dbseged == 6 && (maximummegbizhato - minimummegbizhato) <= 500)
                {
                    dbmegbizhato++;
                    megbizhato.Add(i + 1);
                }
            }

            List<int> gyoztesek = new List<int>();
            int maxertid = 0;
            for (int i = 0; i < N; i++)
            {
                sor = matrix[i];
                sor.Sort();
                if(sor[5] > maxert)
                {
                    maxert = sor[5];
                    maxid = i + 1;
                    sormax = sor;
                    maxertid = i + 1;
                }
                else if (sor[5] == maxert)
                {
                    if (sor[4] > sormax[4])
                    {
                        maxid = i + 1;
                    }
                    else if (sor[4] == sormax[4])
                    {
                        if (sor[3] > sormax[3])
                        {
                            maxid = i + 1;
                        }
                        else if (sor[3] == sormax[3])
                        {
                            if (sor[2] > sormax[2])
                            {
                                maxid = i + 1;
                            }
                            else if (sor[2] == sormax[2])
                            {
                                if (sor[1] > sormax[1])
                                {
                                    maxid = i + 1;
                                }
                                else if (sor[1] == sormax[1])
                                {
                                    if (sor[0] > sormax[0])
                                    {
                                        maxid = i + 1;
                                    }
                                    else if (sor[0] == sormax[0])
                                    {
                                        if (gyoztesek.Contains(maxertid))
                                        {
                                            gyoztesek.Add(i + 1);
                                        }
                                        else
                                        {
                                            gyoztesek.Add(maxertid);
                                            gyoztesek.Add(i + 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (int i = 0; i < legnagyobbDobasok.Count; i++)
            {
                Console.Write("{0} ", legnagyobbDobasok[i]);
            }
            Console.WriteLine();

            for (int i = 0; i < sikeresDobasok.Count; i++)
            {
                Console.Write("{0} ", sikeresDobasok[i]);
            }
            Console.WriteLine();
            for (int i = 0; i < indexek.Count; i++)
            {
                Console.Write("{0} ", indexek[i]);
            }
            Console.WriteLine();
            Console.Write("{0} ", dbmegbizhato);
            for (int i = 0; i < megbizhato.Count; i++)
            {
                Console.Write("{0} ", megbizhato[i]);
            }
            Console.WriteLine();
            if (gyoztesek.Count > 0)
            {
                for (int i = 0; i < gyoztesek.Count; i++)
                {
                    Console.Write("{0} ", gyoztesek[i]);
                }
            }
            else
            {
                Console.WriteLine(maxid);
            }
        }
    }
}