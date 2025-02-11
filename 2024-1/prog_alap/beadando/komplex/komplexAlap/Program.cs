using System;

namespace komplex
{
    internal class Program
    {

        const int MaxN = 1000;



        static void Beolvasas(ref int telepulesSzam, ref int napokSzama, out int[,] adatok)
        {
            adatok = new int[MaxN, MaxN];
            if (!Console.IsInputRedirected)
            {
                //első sor
                bool telepulesbool, napokbool, hosszbool = false;
                Console.Error.WriteLine("Kerem a [telepulesek szamat] [napok Szamat]\tV:");
                string[] tmp = Console.ReadLine().Split();
                while (tmp.Length != 2)
                {
                    Console.Error.WriteLine("Nem 2 adatot adtál meg, [telepulesek szamat] [napok Szamat]\tV:");
                    tmp = Console.ReadLine().Split();
                }
                telepulesbool = Int32.TryParse(tmp[0], out telepulesSzam);
                napokbool = Int32.TryParse(tmp[1], out napokSzama);

                if (!(1 <= telepulesSzam && telepulesSzam <= 1000 && 1 <= napokSzama && napokSzama <= 1000 && napokbool && telepulesbool && tmp.Length == 2))
                {
                    while (!(1 <= telepulesSzam && telepulesSzam <= 1000 && 1 <= napokSzama && napokSzama <= 1000 && napokbool && telepulesbool && tmp.Length == 2))
                    {
                        Console.Error.WriteLine("Hibas adatok kerlek add meg ujra [1 <= N <= 1000] [1 <= M <= 1000]\tV: ");
                        tmp = Console.ReadLine().Split();
                        if (tmp.Length == 2)
                        {
                            telepulesbool = Int32.TryParse(tmp[0], out telepulesSzam);
                            napokbool = Int32.TryParse(tmp[1], out napokSzama);
                        }
                    }
                }

                //összes többi sor
                string[] tmplista = new string[napokSzama];
                adatok = new int[telepulesSzam, napokSzama];

                for (int i = 0; i < telepulesSzam; i++)
                {
                    Console.Error.WriteLine($"Kerem a(z) {i + 1}. telepules adatait ({napokSzama} nap)\tV: ");
                    tmplista = Console.ReadLine().Split();
                    bool valid = false;
                    while (!valid)
                    {
                        bool tmpvalid = true;
                        if (tmplista.Length == napokSzama)
                        {
                            for (int j = 0; j < napokSzama; j++)
                            {
                                bool b = Int32.TryParse(tmplista[j], out adatok[i, j]);
                                if (!b)
                                {
                                    tmpvalid = false;
                                }
                                else if (b)
                                {
                                    if (!(-50 <= Int32.Parse(tmplista[j]) && Int32.Parse(tmplista[j]) <= 50))
                                    {
                                        tmpvalid = false;
                                    }
                                }
                            }
                        }
                        else
                        {
                            tmpvalid = false;
                        }

                        if (!tmpvalid)
                        {
                            Console.Error.WriteLine($"Hibas adat(ok) a(z) {i + 1} telepules adataiban add meg ujra ({napokSzama} nap, -50 <= M[i] <= 50) \tV: ");
                            tmplista = Console.ReadLine().Split();

                        }
                        else if (tmpvalid)
                        {
                            valid = true;
                        }
                    }
                    for (int j = 0; j < napokSzama; j++)
                    {
                        adatok[i, j] = Int32.Parse(tmplista[j]);
                    }

                }
            }
            else if (Console.IsInputRedirected)
            {
                string[] tmp = Console.ReadLine().Split();
                telepulesSzam = Int32.Parse(tmp[0]);
                napokSzama = Int32.Parse(tmp[1]);
                string[] tmplista = new string[napokSzama];
                adatok = new int[telepulesSzam, napokSzama];
                for (int i = 0; i < telepulesSzam; i++)
                {
                    tmplista = Console.ReadLine().Split();
                    for (int j = 0; j < napokSzama; j++)
                    {
                        adatok[i, j] = Int32.Parse(tmplista[j]);
                    }
                }
            }
        }


        static void feladat(int napokSzama, int telepulesSzam, int[,] adatok, out int[] eredmenyek, ref int eredmenyszam)
        {
            eredmenyszam = 0;
            eredmenyek = new int[napokSzama - 1];
            //a 2. naptól kezdem és megszámolom, hogy hányszor melegedett az előző naphoz képest.
            for (int i = 1; i < napokSzama; i++)
            {
                int db = 0;
                for (int j = 0; j < telepulesSzam; j++)
                {
                    if (adatok[j, i - 1] < adatok[j, i])
                    {
                        db++;
                    }
                }
                //megnézem hogy a félénél többször melegedett -e
                if (db * 2 >= telepulesSzam)
                {
                    eredmenyek[eredmenyszam] = i + 1;
                    eredmenyszam++;
                }
            }
        }

        static void kiiras(int[] eredmenyek, int eredmenyszam)
        {
            Console.Write($"{eredmenyszam}");
            for (int i = 0; i < eredmenyszam; i++)
            {
                Console.Write($" {eredmenyek[i]}");
            }
        }

        static void Main(string[] args)
        {
            //deklaracio
            int telepulesSzam = 0;
            int napokSzama = 0;
            int[,] adatok;

            int eredmenyszam = 0;
            int[] eredmenyek;

            //beolvasas
            //Beolvasas(ref telepulesSzam, ref napokSzama, out adatok);
            Beolvasas(ref telepulesSzam, ref napokSzama, out adatok);

            //feladat
            feladat(napokSzama, telepulesSzam, adatok, out eredmenyek, ref eredmenyszam);

            //kiiras
            kiiras(eredmenyek, eredmenyszam);
        }
    }
}
