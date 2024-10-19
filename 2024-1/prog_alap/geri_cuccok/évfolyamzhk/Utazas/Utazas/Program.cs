using System;
using System.Collections.Generic;
namespace Utazas
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

            // Feladat

            int legmesszebbvarosertek = 0;
            int legmesszebbvarossorszam = 0;
            int ertekmasodik = 0;
            int sorszamokDB = 0;
            List<int> varosokar = new List<int>();
            List<int> sorszamok = new List<int>();
            double osztas = 0.0;
            for (int i = 0; i < N; i++)
            {
                osztas = matrix[i][1] / matrix[i][0];
                if (matrix[i][0] > legmesszebbvarosertek)
                {
                    legmesszebbvarosertek = matrix[i][0];
                    legmesszebbvarossorszam = i + 1;
                }
                if (matrix[i][0] < 1000)
                {
                    if (matrix[i][1] > ertekmasodik)
                    {
                        ertekmasodik = matrix[i][1];
                    }
                }
                if (varosokar.Contains(matrix[i][1]))
                {
                    varosokar.Remove(matrix[i][1]);
                }
                else
                {
                    varosokar.Add(matrix[i][1]);
                }
                if (osztas >= 100.0)
                {
                    sorszamokDB++;
                    sorszamok.Add(i + 1);
                }
            }

            // Kiírás

            Console.WriteLine(legmesszebbvarossorszam);
            if (ertekmasodik != 0)
            {
                Console.WriteLine(ertekmasodik);
            }
            else
            {
                Console.WriteLine("-1");
            }
            Console.WriteLine(varosokar.Count);
            Console.Write("{0} ", sorszamokDB);
            for (int i = 0; i < sorszamok.Count; i++)
            {
                Console.Write("{0} ", sorszamok[i]);
            }
        }
    }
}