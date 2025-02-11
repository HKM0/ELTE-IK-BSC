using System;
namespace csoportzh2kodolas
{
    internal class Program
    {
        const int MaxN = 100;

        static void Main(string[] args)
        {
            beolvas(out int telepulesszam, out int napokszama, out double[] atlagok);
            elsofeladat(telepulesszam, napokszama, ref atlagok, out int eloreatlagmax);
            kiir(eloreatlagmax);
        }

        static void beolvas(out int telepulesszam, out int napokszama, out double[] atlagok)
        {
            Console.Error.WriteLine("Kérem a [települések számát] [Napok számát] [hőmérséklet korlát.]\tV: ");
            string[] tmp = Console.ReadLine().Split(" ");
            telepulesszam = Int32.Parse(tmp[0]);
            napokszama = Int32.Parse(tmp[1]);
            atlagok = new double[telepulesszam];
            int homersekletkorlat = Int32.Parse(tmp[2]);

            for (int i = 0; i < telepulesszam; i++)
            {
                Console.Error.WriteLine($"Kérem a(z) {i + 1}. adatot\tV: ");
                tmp = Console.ReadLine().Split(" ");
                double atlag = 0;
                for (int j = 0; j < napokszama; j++)
                {
                    atlag += Int32.Parse(tmp[j]);
                }
                atlagok[i] = atlag / napokszama;
                Console.Error.WriteLine(atlagok[i]);
            }
        }

        static void elsofeladat(int telepulesszam, int napokszama, ref double[] atlagok, out int eloreatlagmax)
        {
            eloreatlagmax = 0;
            for (int i = 1; i < telepulesszam; i++)
            {
                if (atlagok[i] > atlagok[eloreatlagmax])
                {
                    eloreatlagmax = i;
                }
            }
        }

        static void kiir(int eloreatlagmax)
        {
            Console.WriteLine(eloreatlagmax + 1);
        }
    }
}