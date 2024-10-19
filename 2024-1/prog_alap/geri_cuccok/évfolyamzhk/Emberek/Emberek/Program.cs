using System;
using System.Collections.Generic;
namespace Emberek
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
                matrix.Add(sor);
            }

            // Feladatok

            int legidosabbSorszama = 0;
            int legidosebbKora = 0;
            int darabNegyven = 0;
            int darabHarmincnalFiatalabb = 0;
            List<int> KorEgyszer = new List<int>();
            List<int> HarmincnalFiatalabb = new List<int>();
            for (int i = 0; i < N; i++)
            {
                if (!KorEgyszer.Contains(matrix[i][0]))
                {
                    KorEgyszer.Add(matrix[i][0]);
                }
                if(matrix[i][0] > legidosebbKora)
                {
                    legidosabbSorszama = i + 1;
                    legidosebbKora = matrix[i][0];
                }
                if (matrix[i][0] > 40)
                {
                    if (matrix[i][1] < 200000)
                    {
                        darabNegyven++;
                    }
                }
                if (matrix[i][0] < 30)
                {
                    darabHarmincnalFiatalabb++;
                    HarmincnalFiatalabb.Add(i + 1);
                }
            }
            // Kiírás

            Console.WriteLine(legidosabbSorszama);
            Console.WriteLine(darabNegyven);
            Console.WriteLine(KorEgyszer.Count);
            Console.Write("{0} ",darabHarmincnalFiatalabb);
            for (int i = 0; i < HarmincnalFiatalabb.Count; i++)
            {
                Console.Write("{0} ", HarmincnalFiatalabb[i]);
            }

        }
    }
}