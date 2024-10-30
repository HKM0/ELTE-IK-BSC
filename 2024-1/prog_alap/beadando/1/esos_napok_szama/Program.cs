//Bozsó Barnabás    O4QOSE  barnabasbozso05@gmail.com

using System;

namespace esos_napok_szama
{
    internal class Program
    {
        const int MaxN = 100;

        static void Main(string[] args)
        {
            //Deklaráció
            int n;
            int esosDB;
            int[] ml = new int[MaxN];

            //Beolvasás
            bool hibas = false;
            do
            {
                Console.Error.Write("Napok száma: ");
                hibas = ((!Int32.TryParse(Console.ReadLine(), out n)) || (n < 0) || (n > 100));
                if (hibas)
                {
                    Console.Error.WriteLine("Hiba! 0 és 100 közötti egész számot adjon meg.");
                }
            } while (hibas);

            for (int i = 0; i < n; i++)
            {
                do
                {
                    Console.Error.Write("{0}. nap: ", i + 1);
                    hibas = ((!Int32.TryParse(Console.ReadLine(), out ml[i])) || (ml[i] < 0) || (ml[i] > 1000));
                    if (hibas)
                    {
                        Console.Error.WriteLine("Hiba! 0 és 1000 közötti egész számot adjon meg.");
                    }
                } while (hibas);
            }

            //Feldolgozás
            esosDB = 0;
            for (int i = 0; i < n; i++)
            {
                if (ml[i] > 0)
                {
                    esosDB += 1;
                }
            }

            //Kiírás
            Console.Error.Write("\nEsős napok száma: ");
            Console.Write(esosDB);
        }
    }
}
