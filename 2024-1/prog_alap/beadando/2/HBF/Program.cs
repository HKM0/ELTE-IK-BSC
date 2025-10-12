using System;

namespace HBF
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] elsosor = Console.ReadLine().Split(' ');
            int N = int.Parse(elsosor[0]);
            int K = int.Parse(elsosor[1]);
            int[] minimum = new int[N];
            int[] maximum = new int[N];
            int db = 0;
            int elso = 0;
            int utolso = 0;
            bool van = false;
            for (int i = 0; i < N; i++)
            {
                string[] kettoadat = Console.ReadLine().Split(' ');
                maximum[i] = int.Parse(kettoadat[0]);
                minimum[i] = int.Parse(kettoadat[1]);
            }

            bool[] fagyose = new bool[N + 2];
            fagyose[0] = false;
            fagyose[N + 1] = false;
            for (int i = 0; i < N; i++)
            {
                if (minimum[i] < 0 && maximum[i] < 0)
                {
                    fagyose[i + 1] = true;
                }
                else
                {
                    fagyose[i + 1] = false;
                }
            }

            for (int i = 1; i < N + 1; i++)
            {
                if (!fagyose[i-1] && fagyose[i])
                {
                    elso = i;
                    db = 0;
                }
                if (fagyose[i])
                {
                    db++;
                    utolso = i;
                    if (db == K)
                    {
                        van = true;
                        break;
                    }
                }
            }
            if (!van)
            {
                Console.WriteLine("{0}", -1);
            }
            else
            {
                Console.WriteLine("{0} {1}", elso, utolso);
            }
        }
    }
}