using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace komplex
{
    internal class Program
    {
        const int MaxN = 1000;

        static void Main(string[] args)
        {
            // Deklaráció
            int telepulesSzam = 0;
            int napokSzama = 0;
            int[,] adatok;

            // Beolvasás
            Beolvasas(ref telepulesSzam, ref napokSzama, out adatok);

            // Feldolgozás
            int[] eredmenyek = Mintak.Kivalogat(
                1, napokSzama - 1,
                i => TelepulesekTobbsegeNovekedett(i, telepulesSzam, adatok),
                i => i + 1
            );

            // Kiírás
            Kiiras(eredmenyek);
        }

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
        static bool TelepulesekTobbsegeNovekedett(int nap, int telepulesSzam, int[,] adatok)
        {
            int db = 0;
            for (int i = 0; i < telepulesSzam; i++)
            {
                if (adatok[i, nap - 1] < adatok[i, nap])
                {
                    db++;
                }
            }

            return db * 2 >= telepulesSzam;
        }

        static void Kiiras(int[] eredmenyek)
        {
            Console.Write($"{eredmenyek.Length}");
            for (int i = 0; i < eredmenyek.Length; i++)
            {
                Console.Write($" {eredmenyek[i]}");
            }
        }
    }

    public static class Mintak
    {
        #region Összegzés
        #region Általános összegzés
        public static G Szumma<H, G>(int e, int u, Func<int, H> f, G kezd, Func<G, H, int, G> add)
        {
            G s = kezd;
            for (int i = e; i <= u; i++)
            {
                s = add(s, f(i), i);
            }
            return s;
        }
        public static G Szumma<H, G>(int e, int u, Func<int, H> f, G kezd, Func<G, H, G> add)
        {
            return Szumma(e, u, f, kezd, (s, p, i) => add(s, p));
        }
        #endregion
        #region Intervallum számok összegzésre
        public static int Szumma(int e, int u, Func<int, int> f)
        {
            return Szumma(e, u, f, 0, (s, p) => s + p);
        }
        public static double Szumma(int e, int u, Func<int, double> f)
        {
            return Szumma(e, u, f, 0.0, (s, p) => s + p);
        }
        #endregion
        #region Tömb
        public static G Szumma<H, G>(H[] arr, G kezd, Func<G, H, G> add)
        {
            return Szumma(0, arr.Length - 1, i => arr[i], kezd, (s, p, i) => add(s, p));
        }
        #endregion
        #region Tömb számok összegzésre
        public static int Szumma<H>(H[] arr, Func<H, int> f)
        {
            return Szumma(arr, 0, (s, p) => s + f(p));
        }
        public static int Szumma(int[] arr)
        {
            return Szumma(arr, p => p);
        }
        public static double Szumma<H>(H[] arr, Func<H, double> f)
        {
            return Szumma(arr, 0.0, (s, p) => s + f(p));
        }
        public static double Szumma(double[] arr)
        {
            return Szumma(arr, p => p);
        }
        #endregion
        #endregion
        #region Kiválogatás
        #region Intervallum
        public static H[] Kivalogat<H>(int e, int u, Func<int, bool> t, Func<int, H> f)
        {
            return Szumma(e, u, f, new List<H>(), (s, p, i) => {
                if (t(i))
                {
                    s.Add(p);
                }
                return s;
            }).ToArray();
        }
        #endregion
        #region Tömb
        public static G[] Kivalogat<H, G>(H[] arr, Func<H, bool> t, Func<H, int, G> f)
        {
            return Kivalogat(0, arr.Length - 1, i => t(arr[i]), i => f(arr[i], i));
        }
        public static H[] Kivalogat<H>(H[] arr, Func<H, bool> t)
        {
            return Kivalogat(arr, p => t(p), (p, i) => p);
        }
        #endregion
        #endregion
    }
}
