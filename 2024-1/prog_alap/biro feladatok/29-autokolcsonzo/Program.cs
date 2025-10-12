using System;
using System.Collections.Generic;
namespace Autokolcsonzo
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int N = int.Parse(Console.ReadLine());
            List<List<int>> matrix = new List<List<int>>();
            List<int> sor = new List<int>();
            List<string> Rendszamok = new List<string>();
            List<string> RendszamokEgyszer = new List<string>();
            for (int i = 0; i < N; i++)
            {
                sor = new List<int>();
                string[] sorszoveg = Console.ReadLine().Split(" ");
                Rendszamok.Add(sorszoveg[0]);
                if (!RendszamokEgyszer.Contains(sorszoveg[0]))
                {
                    RendszamokEgyszer.Add(sorszoveg[0]);
                }
                sor.Add(int.Parse(sorszoveg[1]));
                sor.Add(int.Parse(sorszoveg[2]));
                matrix.Add(sor);
            }
            int naposszes = 0;
            string maxstr = "";
            int maxert = 0;
            int segednap = 0;
            for (int i = 0; i < N; i++)
            {
                naposszes += (matrix[i][1] - matrix[i][0]) + 1;
            }

            for (int i = 0; i < RendszamokEgyszer.Count; i++)
            {
                segednap = 0;
                for (int j = 0; j < N; j++)
                {
                    if (Rendszamok[j] == RendszamokEgyszer[i])
                    {
                        segednap += (matrix[j][1] - matrix[j][0]) + 1;
                    }
                }
                if(segednap > maxert)
                {
                    maxert = segednap;
                    maxstr = RendszamokEgyszer[i];
                }
            }
            Console.WriteLine("#");
            Console.WriteLine(naposszes);
            Console.WriteLine("#");
            Console.WriteLine(maxstr);

            List<int> darabok = new List<int>();
            int segedDB = 0;
            int maxDB = 0;
            int maxid2 = 0;
            for (int i = 1; i <= 30; i++)
            {
                segedDB = 0;
                for (int j = 0; j < N; j++)
                {
                    if (matrix[j][0] <= i && matrix[j][1] > i)
                    {
                        segedDB++;
                    }
                }
                darabok.Add(segedDB);
                if(segedDB > maxDB)
                {
                    maxDB = segedDB;
                    maxid2 = i;
                }
            }
            Console.WriteLine("#");
            Console.WriteLine(maxid2);
            Console.WriteLine("#");
            List<int>Sorozat = new List<int>();
            int osszesmaxDb = darabok[0];
            for (int i = 1; i < darabok.Count; i++)
            {
                if (darabok[i] > osszesmaxDb)
                {
                    osszesmaxDb = darabok[i];
                    Sorozat.Add(i + 1);
                }
            }
            if (Sorozat.Count == 0)
            {
                Console.WriteLine("0");
            }
            else
            {
                for (int i = 0; i < Sorozat.Count; i++)
                {
                    Console.Write("{0} ", Sorozat[i]);
                }
                Console.WriteLine();
            }
            Console.WriteLine("#");

            int segedosszesnap = 0;
            int segedDBnap = 0;
            List<string> RendszamAdatok = new List<string>();
            for (int i = 0; i < RendszamokEgyszer.Count; i++)
            {
                segedosszesnap = 0;
                segedDBnap = 0;
                for (int j = 0; j < N; j++)
                {
                    if (Rendszamok[j] == RendszamokEgyszer[i])
                    {
                        segedosszesnap += (matrix[j][1] - matrix[j][0]) + 1;
                        segedDBnap++;
                    }
                }
                RendszamAdatok.Add((RendszamokEgyszer[i] + " " + segedDBnap + " " + segedosszesnap));
            }
            for (int i = 0; i < RendszamAdatok.Count; i++)
            {
                Console.WriteLine(RendszamAdatok[i]);
            }
        }
    }
}