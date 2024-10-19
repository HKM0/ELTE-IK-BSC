using System;
using System.Collections.Generic;

namespace Lakas
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

            int legdragabblakasar = 0;
            int legdragabblakassorszam = 0;
            int dbszaznegyven = 0;
            int sorszamokDB = 0;
            List<int> Alapteruletek = new List<int>();
            List<int> sorszamok = new List<int>();
            for (int i = 0; i < N; i++)
            {
                if (matrix[i][1] > legdragabblakasar)
                {
                    legdragabblakasar = matrix[i][1];
                    legdragabblakassorszam = i + 1;
                }
                if (matrix[i][0] > 100)
                {
                    if (matrix[i][1] < 40)
                    {
                        dbszaznegyven++;
                    }
                }
                if (!Alapteruletek.Contains(matrix[i][0]))
                {
                    Alapteruletek.Add(matrix[i][0]);
                }
                if (matrix[i][1] > 100)
                {
                    sorszamokDB++;
                    sorszamok.Add(i + 1);
                }
            }

            // Kiírás

            Console.WriteLine(legdragabblakassorszam);
            Console.WriteLine(dbszaznegyven);
            Console.WriteLine(Alapteruletek.Count);
            Console.Write("{0} ", sorszamokDB);
            for (int i = 0; i < sorszamok.Count; i++)
            {
                Console.Write("{0} ", sorszamok[i]);
            }
        }
    }
}