using System;   
namespace foci
{
    internal class Program
    {
        const int maxn = 100;

        struct Beadat
        {
            public string hazai_csapat;
            public string vendeg_csapat;
            public int hazai_gol;
            public int vendeg_gol;
        }

        static void Main(string[] args)
        {
            int merkozes_db = 0;
            string keresett_csapat = "";
            Beadat[] merkozesek = new Beadat[maxn];
            Beolvas(out merkozesek, out keresett_csapat, out merkozes_db);

            /* 1) Melyik csapat rúgta a legtöbb gólt egy meccsen? (a bemenet sorrendjében az első ilyet kell megadni)*/
            Console.WriteLine("#");
            Console.WriteLine(feladat_1(merkozesek, merkozes_db));

            /*  2) Melyek azok a csapatok, amelyek legalább egy meccsen több gólt rúgtak, mint az ellenfelük?
                    Ha nincs ilyen csapat, akkor 0-t kell kiírni, és minden csapat neve egyszer szerepeljen, a bemenet sorrendjében!*/
            Console.WriteLine("#");
            string[] gyoztes_csapatok = feladat_2(merkozesek, merkozes_db);
            int gyoztes_db = 0;
            for (int i = 0; i < gyoztes_csapatok.Length; i++)
            {
                if (gyoztes_csapatok[i] != null)
                {
                    gyoztes_db++;
                }
            }
            Console.Write($"{gyoztes_db}");
            if (gyoztes_csapatok[0] == null)
            {
                Console.WriteLine("0");
            }
            else
            {
                for (int i = 0; i < gyoztes_csapatok.Length && gyoztes_csapatok[i] != null; i++)
                {
                    Console.Write($" {gyoztes_csapatok[i]}");
                }
            }

            // 3) Hány csapat játszott?
            Console.WriteLine("\n#");
            int csapatok_szama = feladat_3(merkozesek, merkozes_db);
            Console.WriteLine(csapatok_szama);

            /* 4) A paraméterben megadott csapat rúgott és kapott góljainak, valamint szerzett pontjainak száma 
                  (a győzelemért 3, a döntetlenért 1 pont jár). Ha nincs ilyen csapat, akkor 0 0 0-t kell kiírni.*/
            Console.WriteLine("#");
            int[] csapat_stat = feladat_4(merkozesek, merkozes_db, keresett_csapat);
            Console.WriteLine($"{csapat_stat[0]} {csapat_stat[1]} {csapat_stat[2]}");


            // 5) Csapatonként írd ki, hogy melyik hány meccset játszott! Minden csapat neve egyszer szerepeljen, a bemenet sorrendjében!
            Console.WriteLine("#");
            feladat_5(merkozesek, merkozes_db);
        }

        static void Beolvas(out Beadat[] merkozesek, out string keresett_csapat, out int merkozes_db)
        {
            Console.Error.WriteLine("Kérem a [meccsek számát] [a keresett csapatot]\tV: ");
            string[] bemenet = Console.ReadLine().Split(" ");
            merkozes_db = Int32.Parse(bemenet[0]);
            keresett_csapat = bemenet[1];
            merkozesek = new Beadat[merkozes_db];

            for (int i = 0; i < merkozes_db; i++)
            {
                Console.Error.WriteLine($"Kérem a {i + 1}. meccs adatait [hazai csapat] [vendég csapat] [hazai gól] [vendég gól]\tV: ");
                bemenet = Console.ReadLine().Split(" ");
                merkozesek[i].hazai_csapat = bemenet[0];
                merkozesek[i].vendeg_csapat = bemenet[1];
                merkozesek[i].hazai_gol = Int32.Parse(bemenet[2]);
                merkozesek[i].vendeg_gol = Int32.Parse(bemenet[3]);
            }
        }

        static string feladat_1(Beadat[] merkozesek, int merkozes_db)
        {
            string legtobb_golos_csapat = "";
            int legtobb_gol = -1;

            for (int i = 0; i < merkozes_db; i++)
            {
                if (merkozesek[i].hazai_gol > legtobb_gol)
                {
                    legtobb_gol = merkozesek[i].hazai_gol;
                    legtobb_golos_csapat = merkozesek[i].hazai_csapat;
                }
                if (merkozesek[i].vendeg_gol > legtobb_gol)
                {
                    legtobb_gol = merkozesek[i].vendeg_gol;
                    legtobb_golos_csapat = merkozesek[i].vendeg_csapat;
                }
            }
            return legtobb_golos_csapat;
        }

        static string[] feladat_2(Beadat[] merkozesek, int merkozes_db)
        {
            string[] csapatok = new string[merkozes_db * 2];
            int szamlalo = 0;
            for (int i = 0; i < merkozes_db; i++)
            {
                bool hazai_uj = true;
                bool vendeg_uj = true;
                for (int j = 0; j < szamlalo; j++)
                {
                    if (csapatok[j] == merkozesek[i].hazai_csapat)
                    {
                        hazai_uj = false;
                    }
                    if (csapatok[j] == merkozesek[i].vendeg_csapat)
                    {
                        vendeg_uj = false;
                    }
                }
                if (hazai_uj && merkozesek[i].hazai_gol > merkozesek[i].vendeg_gol)
                {
                    csapatok[szamlalo] = merkozesek[i].hazai_csapat;
                    szamlalo++;
                }
                if (vendeg_uj && merkozesek[i].vendeg_gol > merkozesek[i].hazai_gol)
                {
                    csapatok[szamlalo] = merkozesek[i].vendeg_csapat;
                    szamlalo++;
                }
            }
            return csapatok;
        }

        static int feladat_3(Beadat[] merkozesek, int merkozes_db)
        {
            string[] csapatok = new string[merkozes_db * 2];
            int szamlalo = 0;

            for (int i = 0; i < merkozes_db; i++)
            {
                bool hazai_uj = true;
                bool vendeg_uj = true;
                for (int j = 0; j < szamlalo; j++)
                {
                    if (csapatok[j] == merkozesek[i].hazai_csapat)
                    {
                        hazai_uj = false;
                    }
                    if (csapatok[j] == merkozesek[i].vendeg_csapat)
                    {
                        vendeg_uj = false;
                    }
                }
                if (hazai_uj)
                {
                    csapatok[szamlalo] = merkozesek[i].hazai_csapat;
                    szamlalo++;
                }
                if (vendeg_uj)
                {
                    csapatok[szamlalo] = merkozesek[i].vendeg_csapat;
                    szamlalo++;
                }
            }
            return szamlalo;
        }

        static int[] feladat_4(Beadat[] merkozesek, int merkozes_db, string csapat)
        {
            int rugott_gol = 0;
            int kapott_gol = 0;
            int pont = 0;

            for (int i = 0; i < merkozes_db; i++)
            {
                if (merkozesek[i].hazai_csapat == csapat)
                {
                    rugott_gol += merkozesek[i].hazai_gol;
                    kapott_gol += merkozesek[i].vendeg_gol;

                    if (merkozesek[i].hazai_gol > merkozesek[i].vendeg_gol)
                    {
                        pont += 3; 
                    }
                    else if (merkozesek[i].hazai_gol == merkozesek[i].vendeg_gol)
                    {
                        pont += 1;
                    }
                }
                else if (merkozesek[i].vendeg_csapat == csapat)
                {
                    rugott_gol += merkozesek[i].vendeg_gol;
                    kapott_gol += merkozesek[i].hazai_gol;

                    if (merkozesek[i].vendeg_gol > merkozesek[i].hazai_gol)
                    {
                        pont += 3;
                    }
                    else if (merkozesek[i].vendeg_gol == merkozesek[i].hazai_gol)
                    {
                        pont += 1;
                    }
                }
            }

            return new int[] { rugott_gol, kapott_gol, pont };
        }



        static void feladat_5 (Beadat[] merkozesek, int merkozes_db)
        {
            string[] csapatok = new string[merkozes_db * 2];
            int[] meccsek_szama = new int[merkozes_db * 2];
            int szamlalo = 0;
            for (int i = 0; i < merkozes_db; i++)
            {
                bool hazai_uj = true;
                bool vendeg_uj = true;
                int hazai_index = -1;
                int vendeg_index = -1;
                for (int j = 0; j < szamlalo; j++)
                {
                    if (csapatok[j] == merkozesek[i].hazai_csapat)
                    {
                        hazai_uj = false;
                        hazai_index = j;
                    }
                    if (csapatok[j] == merkozesek[i].vendeg_csapat)
                    {
                        vendeg_uj = false;
                        vendeg_index = j;
                    }
                }
                if (hazai_uj)
                {
                    csapatok[szamlalo] = merkozesek[i].hazai_csapat;
                    meccsek_szama[szamlalo] = 1;
                    szamlalo++;
                }
                else
                {
                    meccsek_szama[hazai_index]++;
                }
                if (vendeg_uj)
                {
                    csapatok[szamlalo] = merkozesek[i].vendeg_csapat;
                    meccsek_szama[szamlalo] = 1;
                    szamlalo++;
                }
                else
                {
                    meccsek_szama[vendeg_index]++;
                }
            }
            for (int i = 0; i < szamlalo; i++)
            {
                Console.WriteLine($"{csapatok[i]} {meccsek_szama[i]}");
            }
        }
    }
}
