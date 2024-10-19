using System;
using System.Collections.Generic;
namespace Eso
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
                sor.Add(int.Parse(sorszoveg[6]));
                matrix.Add(sor);
            }
            int csapadek = 0;
            List<int> csapadekok = new List<int>();
            List<int> hettenottek = new List<int>();
            int maxcsapadek = 0;
            int csapadekInd = 1;
            int hetennottDB = 0;
            bool hetennott = true;
            for (int i = 0; i < N; i++)
            {
                hetennott = true;
                csapadek = 0;
                for (int j = 0; j < 7; j++)
                {
                    csapadek += matrix[i][j];
                }
                for (int j = 1; j < 7; j++)
                {
                    if (!(matrix[i][j] > matrix[i][j - 1]))
                    {
                        hetennott = false;
                    }
                }
                csapadekok.Add(csapadek);
                if(csapadek > maxcsapadek)
                {
                    maxcsapadek = csapadek;
                    csapadekInd = i + 1;
                }
                if(hetennott)
                {
                    hetennottDB++;
                    hettenottek.Add(i + 1);
                }
            }
            int mincsapadek = 8;
            int mincsapadekID = 1;
            int csapadekdb = 0;

            for(int i = 0; i < N / 2; i++)
            {
                csapadekdb = 0;
                for (int j = 0; j < 7; j++)
                {
                    if (matrix[i][j] != 0)
                    { 
                        csapadekdb++;
                    }
                }
                if(csapadekdb < mincsapadek)
                {
                    mincsapadek = csapadekdb;
                    mincsapadekID = i + 1;
                }
            }
            List<int> csapadektiz = new List<int>();
            List<int> csapadektizseged = new List<int>();
            for (int i = 0; i < N; i++)
            {
                csapadek = 0;
                for (int j = 0; j < 7; j++)
                {
                    csapadek += matrix[i][j];
                }
                if(csapadek <= 10)
                {
                    csapadektizseged.Add(i + 1);
                }
                else
                {
                    if (csapadektizseged.Count > csapadektiz.Count)
                    {
                        csapadektiz = csapadektizseged;
                        csapadektizseged = new List<int>();
                    }
                    else
                    {
                        csapadektizseged = new List<int>();
                    }
                }
            }


            for (int i = 0; i < N; i++)
            {
                Console.Write("{0} ", csapadekok[i]);
            }
            Console.WriteLine();

            Console.WriteLine(csapadekInd);

            Console.Write("{0} ", hetennottDB);
            for (int i = 0; i < hettenottek.Count; i++)
            {
                Console.Write("{0} ", hettenottek[i]);
            }

            Console.WriteLine();
            Console.WriteLine(mincsapadekID);

            if(csapadektiz.Count == 1)
            {
                Console.WriteLine("{0} {0}", csapadektiz[0]);
            }
            else if(csapadektiz.Count > 1)
            {
                Console.WriteLine("{0} {1}", csapadektiz[0], csapadektiz[csapadektiz.Count - 1]);
            }
            else
            {
                Console.WriteLine("0");
            }
        }
    }
}