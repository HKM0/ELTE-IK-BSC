using System.Runtime.InteropServices;
using System;
namespace ElsoBeadandoFeladat
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int N;
            int.TryParse(Console.ReadLine(), out N);
            int db=0;
            for (int i = 0; i < N; i++)
            {
                string[] kettoadat = Console.ReadLine().Split(' ');
                int kukutyin = int.Parse(kettoadat[0]);
                int piripocs = int.Parse(kettoadat[1]);
                if (kukutyin < piripocs)
                {
                    db++;
                }
            }
            Console.WriteLine("{0}", db);
        }
    }
}