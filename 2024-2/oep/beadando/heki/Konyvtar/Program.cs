using System;
using System.Collections.Generic;
using System.Net.Http.Headers;

namespace KonyvtarBeadando
{

    internal class Program
    {
        /*-------------------------------------*/
        /*-------Ritkasag string atalakit------*/
        /*-------------------------------------*/
        private Ritkasag stringMeghatarozRitkasag(string r)
        {
            r = r.ToLower();
            if (r == "sok")
            {
                return Sok.Instance;
            }
            else if (r == "keves")
            {
                return Keves.Instance;
            }
            else if (r == "ritka")
            {
                return Ritka.Instance;
            }
            else
            {
                throw new Exception($"Ismeretlen ritkasag: {r}");
            }
        }

        /*-------------------------------------*/
        /*--------Tipus string atalakit--------*/
        /*-------------------------------------*/

        //elso fajl:
        private void konyvek_load(string KonyvekBetoltes, Konyvtar konyvtar)
        {
            if (File.Exists(KonyvekBetoltes))
            {
                foreach (var sor in File.ReadAllLines(KonyvekBetoltes))
                {
                    var elem = sor.Split(';');
                    if (elem.Length == 6)
                    {
                        string cim = elem[0];
                        string szerzo = elem[1];
                        string kiado = elem[2];
                        string isbn = elem[3];
                        string r = elem[4];
                        string t = elem[5];

                        try
                        {
                            Ritkasag ritkasag = stringMeghatarozRitkasag(r);
                            Konyv k;

                            switch (t.ToLower())
                            {
                                case "termeszettudomanyi":
                                    k = new Termeszettudomanyi(cim, szerzo, kiado, isbn, ritkasag);
                                    break;
                                case "szepirodalmi":
                                    k = new Szepirodalmi(cim, szerzo, kiado, isbn, ritkasag);
                                    break;
                                case "ifjusagi":
                                    k = new Ifjusagi(cim, szerzo, kiado, isbn, ritkasag);
                                    break;
                                default:
                                    throw new Exception($"Ismeretlen típus: {t}");
                            }

                            konyvtar.KonyvHozzaad(k);

                            Console.Error.WriteLine($"{k.cim};{k.szerzo};{k.kiado};{k.isbn};{k.ritkasag.GetType().Name};{k.GetType().Name}");
                        }
                        catch (Exception ex)
                        {
                            Console.Error.WriteLine($"Hiba a könyv betöltésekor (cím: {cim})");
                        }
                    }
                }
            }
            else
            {
                Console.Error.WriteLine("Nincs meg a helyén a konyvek.txt");
            }
        }




        //masodik fajl:
        private void tagok_load(string TagokBetoltes, Konyvtar konyvtar)
        {
            if (File.Exists(TagokBetoltes))
            {
                foreach (var sor in File.ReadAllLines(TagokBetoltes))
                {
                    var elemek = sor.Split(';');
                    if (elemek.Length == 3)
                    {
                        string nev = elemek[0];
                        string cim = elemek[1];
                        string igazolvany = elemek[2];

                        Tag ujTag = new Tag(nev, cim, igazolvany, konyvtar);

                        try
                        {
                            konyvtar.TagRegisztral(ujTag);

                            //Csak visszajelzés.
                            Console.Error.WriteLine($"{ujTag.nev};\t{ujTag.cim};\t{ujTag.igazolvany}\t|| tartozasa: {ujTag.tartozik}");
                        }
                        catch (Exception)
                        {
                            Console.Error.WriteLine($"Hiba a tag regisztrálásakor (ennél a névél: {nev})");
                        }
                    }
                }
            }
            else
            {
                Console.WriteLine("Nem található a tag fájl: " + TagokBetoltes);
            }
        }
        //harmadik fajl:
        private void kolcsonzesek_load(string KolcsonzesFajl, Konyvtar konyvtar) 
        {
            if (File.Exists(KolcsonzesFajl))
            {
                foreach (var sor in File.ReadAllLines(KolcsonzesFajl))
                {
                    var elemek = sor.Split(';');
                    if (elemek.Length == 4)
                    {
                        if (!DateTime.TryParse(elemek[0], out DateTime kezdet))
                        {
                            Console.Error.WriteLine($"Hibás kezdeti dátum: {elemek[0]}");
                            continue;
                        }
                        if (!DateTime.TryParse(elemek[1], out DateTime vege))
                        {
                            Console.Error.WriteLine($"Hibás végső dátum: {elemek[1]}");
                            continue;
                        }

                        string tagID = elemek[2];
                        Tag tag = null;
                        foreach (Tag t in konyvtar.tagok)
                        {
                            if (t.igazolvany == tagID)
                            {
                                tag = t;
                                break;
                            }
                        }
                        if (tag == null)
                        {
                            Console.Error.WriteLine("Nincs ilyen tag!");
                        }

                        List<string> konyvcimek = new List<string>();
                        string[] cimek = elemek[3].Split(',');
                        foreach (string c in cimek)
                        {
                            konyvcimek.Add(c);
                        }

                        var kolcsonzottkonyvek = new List<Konyv>();
                        foreach (var cim in konyvcimek)
                        {
                            Konyv konyv = null;
                            foreach (Konyv k in konyvtar.konyvek)
                            {
                                if (k.cim == cim)
                                {
                                    konyv = k;
                                    break;
                                }
                            }

                            if (konyv != null)
                            {
                                kolcsonzottkonyvek.Add(konyv);
                            }
                            else
                            {
                                Console.Error.WriteLine("Ez a konyv nem talalhato");
                            }
                        }

                        if (kolcsonzottkonyvek.Count > 0)
                        {
                            Kolcsonzes kolcsonzes = new Kolcsonzes(kezdet, vege, kolcsonzottkonyvek, tag);
                            tag.Kolcsonzesek.Add(kolcsonzes);
                        }
                    }
                }
            }
            else
            {
                Console.Error.WriteLine("Nem található a kolcsonzott.txt");
            }
        }

        //negyedik fajl
        private void visszahozasok_load(string visszaHozasFajl, Konyvtar konyvtar)
        {
            if (!File.Exists(visszaHozasFajl))
            {
                Console.Error.WriteLine("Nem található a visszahozott.txt");
                return;
            }

            foreach (var sor in File.ReadAllLines(visszaHozasFajl))
            {
                var elemek = sor.Split(';');
                if (elemek.Length != 3)
                {
                    Console.Error.WriteLine($"Hibás sor a visszahozás fájlban: {sor}");
                    continue;
                }

                string tagID = elemek[0];
                DateTime visszahozasDatum;
                if (!DateTime.TryParse(elemek[1], out visszahozasDatum))
                {
                    Console.Error.WriteLine($"Hibás dátum: {elemek[1]}");
                    continue;
                }

                string[] konyvcimek = elemek[2].Split(',');

                Tag tag = null;
                foreach (Tag t in konyvtar.tagok)
                {
                    if (t.igazolvany == tagID)
                    {
                        tag = t;
                        break;
                    }
                }

                if (tag == null)
                {
                    Console.Error.WriteLine($"Nincs ilyen tag: {tagID}");
                    continue;
                }

                foreach (Kolcsonzes kolcsonzes in tag.Kolcsonzesek)
                {
                    foreach (string cim in konyvcimek)
                    {
                        Konyv konyv = null;
                        foreach (Konyv k in kolcsonzes.kolcsonKonyvek)
                        {
                            if (k.cim == cim)
                            {
                                konyv = k;
                                break;
                            }
                        }

                        if (konyv != null)
                        {
                            try
                            {
                                kolcsonzes.KonyvVisszahozas(konyv, tag);
                                Console.Error.WriteLine($"Visszahozva: {konyv.cim} ({tag.nev}) {visszahozasDatum.ToShortDateString()}");
                            }
                            catch (Exception ex)
                            {
                                Console.Error.WriteLine($"Hiba visszahozás közben: {ex.Message}");
                            }
                        }
                        else
                        {
                            Console.WriteLine($"Nem található könyv a kölcsönzésben: {cim}");
                        }
                    }
                }
            }
        }




        /*-------------------------------------*/
        /*--------------futtatás---------------*/
        /*-------------------------------------*/

        static void Main(string[] args)
        {
            string KonyvekBetoltes = "konyvek.txt";
            string TagokBetoltes = "tagok.txt";
            string KolcsonzesFajl = "kolcsonzott.txt";
            string visszaHozasFajl = "visszahozott.txt";

            Konyvtar k = new Konyvtar();

            Program p = new Program();
            p.konyvek_load(KonyvekBetoltes, k);
            p.tagok_load(TagokBetoltes, k);
            p.kolcsonzesek_load(KolcsonzesFajl, k);
            p.visszahozasok_load(visszaHozasFajl, k);

            //kérdések:
            // b) Első tag tartozásai
            var elsoTag = k.tagok[0];
            Console.WriteLine($"\nA \"{elsoTag.nev}\" nevű tag tartozása: {elsoTag.tartozas()}");


            // c) Egy adott könyv címe
            string keresettKonyv = "Harry Potter";
            Console.WriteLine($"\nElérhető a \"{keresettKonyv}\" című könyv? \tV: {(k.KonyvElerheto(keresettKonyv) ? "Igen" : "Nem")}");

            // d) Tagja-e egy adott nevű személy a könyvtárnak
            string nev = "Németh Anna";
            Console.WriteLine($"\nTagja-e \"{nev}\" a könyvtárnak? \tV: {(k.TagE(nev) ? "Igen" : "Nem")}");
        }
    }
}
