using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace KonyvtarBeadando
{
    public class Tag
    {
        /*-------------------------------------*/
        /*--------------adattagok--------------*/
        /*-------------------------------------*/
        public string nev { get; private set; }
        public string cim { get; private set; }
        public string igazolvany { get; private set; }
        public List<Kolcsonzes> Kolcsonzesek = new List<Kolcsonzes>();
        public int tartozik;
        private Konyvtar konyvtar;


        /*-------------------------------------*/
        /*--------------konstruktor------------*/
        /*-------------------------------------*/
        public Tag(string nev, string cim, string igazolvany, Konyvtar konyvtar)
        {
            this.nev = nev;
            this.cim = cim;
            this.igazolvany = igazolvany;
            this.tartozik = 0;
            this.konyvtar = konyvtar;
        }


        /*-------------------------------------*/
        /*---------------metodusok-------------*/
        /*-------------------------------------*/

        /*------------------*/
        /*--keses I vagy H--*/
        /*------------------*/
        public bool vanKesese()
        {
            return tartozas() > 0;
        }

        /*------------------*/
        /*----tartozasok----*/
        /*------------------*/
        public int tartozas()
        {
            int tartozasOsszeg = this.tartozik;

            foreach (var k in Kolcsonzesek)
            {
                if (DateTime.Now > k.KolcsonzesVege)
                {
                    int kesesNapok = k.KesesiDijSzamolasa(DateTime.Now, k.KolcsonzesVege);
                    foreach (var konyv in k.kolcsonKonyvek)
                    {
                        if (kesesNapok > 0)
                        {
                            tartozasOsszeg += konyv.Szamolas() * kesesNapok;
                        }
                    }
                }
            }
            return tartozasOsszeg;
        }

        /*------------------*/
        /*----dij fizetes---*/
        /*------------------*/
        public void dijFizet(int befizetettOsszeg)
        {
            if (befizetettOsszeg <= 0)
            {
                throw new ArgumentException("A fizetett osszegnek pozitivnak kell lennie!");
            } 
            if (this.tartozik < befizetettOsszeg) 
            {
                throw new ArgumentException("Nem fizethet tobbet mint a tartozasa!");
            }

            this.tartozik -= befizetettOsszeg;
            if (this.tartozik < 0)
            {
                this.tartozik = 0;
            }
        }

        /*------------------*/
        /*-kolcsonzes lista-*/
        /*------------------*/
        public void EppenKolcsonzottKonyvek()
        {
            Console.Error.WriteLine($"{nev} Kolcsonzesei:");
            foreach (var kolcsonzes in Kolcsonzesek)
            {
                foreach (var konyv in kolcsonzes.kolcsonKonyvek)
                {
                    Console.WriteLine($"{konyv.cim}");
                }
            }
        }


        /*------------------*/
        /*-konyv kolcsonzese*/
        /*---darabonként----*/
        /*------------------*/
        public void KonyvKolcsonzese(Konyv konyv)
        {
            if (konyv == null)
                throw new Exception("Null eretket adtal meg.");
            bool elerheto = false;
            if (konyvtar.KonyvElerheto(konyv.cim))
            {
                elerheto = true;
            }
            int tmp = 0;
            foreach (var kolcson in Kolcsonzesek)
            {
                    tmp+= kolcson.kolcsonKonyvek.Count;
            }
            if (5 - tmp > 0 && tartozik == 0 && elerheto)
            {
                var ujKolcsonzes = new Kolcsonzes(DateTime.Now, DateTime.Now.AddDays(7), konyv, this);
                Kolcsonzesek.Add(ujKolcsonzes);
            }
            else 
            {
                throw new Exception("Nem kolcsonozheto tobb konyv mint 5 vagy nincs ilyen konyv");
            }
        }

        /*------------------*/
        /*-konyv kolcsonzese*/
        /*-------lista------*/
        /*------------------*/
        public void KonyvKolcsonzese(List<Konyv> konyv) 
        {
            for (int i=0; i < konyvtar.konyvek.Count-1; i++)
            {
                if (konyvtar.KonyvElerheto(konyv[i].cim))
                {
                    KonyvKolcsonzese(konyv[i]);
                }
                else
                {
                    Console.Error.WriteLine($"Nincs ilyen \"{konyv[i].cim}\" cimu elerheto konyv.");
                }
            }
        }


        /*------------------*/
        /*-tag konyv vissza-*/
        /*------------------*/
        public void konyvVisszahozas(Konyv konyv)
        {
            foreach (var t in Kolcsonzesek)
            {
                if (t.kolcsonKonyvek.Contains(konyv))
                {
                    t.KonyvVisszahozas(konyv, this);
                }
            }
        }

        /*------------------*/
        /*tag kilépés vissza*/
        /*------------------*/
        public void Kilepes()
        {
            konyvtar.TagKileptet(this);
        }
    }
}
