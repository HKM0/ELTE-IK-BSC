using System;
using System.Collections.Generic;
namespace Idojaras
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int N = int.Parse(Console.ReadLine());
            List<int> minimum = new List<int>();
            List<int> maximum = new List<int>();
            for (int i = 0; i < N; i++)
            {
                string[] sor = Console.ReadLine().Split(' ');
                minimum.Add(int.Parse(sor[0]));
                maximum.Add(int.Parse(sor[1]));
            }

            // 1. Részfeladat

            Console.WriteLine("#");
            int dbelso = 0;
            int maxkulonbseg = 0;
            int maxid = 0;
            bool Elsoe = false;
            for (int i = 0; i < N; i++)
            {
                if (minimum[i] <= 0)
                {
                    dbelso++;
                }
                if (Elsoe)
                {
                    maxkulonbseg = maximum[i] - minimum[i];
                    maxid = i + 1;
                }
                else
                {
                    if((maximum[i] - minimum[i]) > maxkulonbseg)
                    {
                        maxkulonbseg = maximum[i] - minimum[i];
                        maxid = i + 1;
                    }
                }
            }
            Console.WriteLine(dbelso);

            // 2. Részfeladat

            Console.WriteLine("#");
            Console.WriteLine(maxid);

            // 3. Részfeladat

            Console.WriteLine("#");

            bool vanEharom = false;
            int napAholkisebb = 0;
            for (int i = 1; i < N; i++)
            {
                if (maximum[i] < minimum[i - 1])
                {
                    napAholkisebb = i + 1;
                    vanEharom = true;
                    break;
                }
            }
            if(!vanEharom)
            {
                Console.WriteLine("-1");
            }
            else
            { 
                Console.WriteLine(napAholkisebb);
            }

            // 4. Részfeladat

            Console.WriteLine("#");

            int fagyosdarabszam = 0;
            List<int> fagyosolvadosok = new List<int>();
            for (int i = 0; i < N; i++)
            {
                if (minimum[i] <= 0 && maximum[i] > 0)
                {
                    fagyosdarabszam++;
                    fagyosolvadosok.Add(i + 1);
                }
            }
            Console.Write("{0} ", fagyosdarabszam);
            for (int i = 0; i < fagyosolvadosok.Count; i++)
            {
                Console.Write("{0} ", fagyosolvadosok[i]);
            }
        }
    }
}