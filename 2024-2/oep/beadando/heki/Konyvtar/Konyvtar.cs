using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace KonyvtarBeadando
{
    public class Konyvtar
    {
        /*-------------------------------------*/
        /*--------------adattagok--------------*/
        /*-------------------------------------*/
        #region fields
        public List<Konyv> konyvek = new List<Konyv>();
        public List<Tag> tagok = new List<Tag>();
        #endregion
        /*-------------------------------------*/
        /*---------------metódusok-------------*/
        /*-------------------------------------*/

        /*------------------*/
        /*--konyv hozzaadas-*/
        /*------------------*/
        public void KonyvHozzaad(Konyv konyv) // kesz
        {
            if (konyv == null)
                throw new Exception("Ne null erteket adj a konyvnek!");
            konyvek.Add(konyv);
        }

        /*------------------*/
        /*--konyv elvetele--*/
        /*------------------*/ 
        public void KonyvElvetel(Konyv konyv) // kesz
        {
            if (konyv == null)
                throw new Exception("Ne null erteket adj a konyvnek!");

            if (konyvek.Contains(konyv))
                throw new Exception("Nincs ilyen konyv a konyvtarban.");


            bool konyvLetezik = false;
            foreach (var k in konyvek)
            {
                if (k == konyv) 
                {
                    konyvLetezik = true;
                    break;
                }
            }

            if (!konyvLetezik)
            {
                throw new Exception("Nincs ilyen konyv a konyvek kozott.");
            }
            bool kolcsonozve = false;

            foreach (var tag in tagok)
            {
                foreach (var kolcsonzes in tag.Kolcsonzesek)
                {
                    foreach (var kolcsonzottKonyv in kolcsonzes.kolcsonKonyvek)
                    {
                        if (kolcsonzottKonyv == konyv) // itt csak reménykedtem hogy referencia alapon hasonlít össze.
                        {
                            kolcsonozve = true;
                            break; 
                        }
                    }

                    if (kolcsonozve)
                    {
                        break; //feljebb ugrok és kilépek mert megtalálta és kölcsönözve van.
                    }
                }

                if (kolcsonozve)
                {
                    break;
                }
            }
            //error
            if (kolcsonozve)
            {
                throw new Exception("Nem torolheted az eppen kolcsonzott konyveket.");
            }

            //torles
            for (int i = 0; i < konyvek.Count; i++)
            {
                if (konyvek[i] == konyv)
                {
                    konyvek.RemoveAt(i);
                    break;
                }
            }
        }


        /*------------------*/
        /*-rag regisztralasa*/
        /*------------------*/
        public void TagRegisztral(Tag tag) // kesz
        {
            if (tag == null)
            {
                throw new Exception("Null erteket adtal meg Tag helyett.");
            }

            bool regisztralhato = true;
            foreach (var t in tagok)
            {
                if (t.igazolvany == tag.igazolvany)
                {
                    regisztralhato = false;
                }
            }
            if (regisztralhato)
            {
                tagok.Add(tag);
            }
            else 
            {
                throw new Exception("A tag mar regisztralva van.");
            }
        }


        /*------------------*/
        /*--tag kileptetese-*/
        /*------------------*/
        public void TagKileptet(Tag tag) // kesz
        {
            if (tag == null)
                throw new Exception("Null erteket adtal meg Tag helyett.");

            if (!tagok.Contains(tag))
            { 
                throw new Exception("Nincs ilyen tag ragisztralva.");
            }
            bool vantartozasa = false;
            foreach (var t in tag.Kolcsonzesek)
            {
                if (t.kolcsonKonyvek.Count > 0)
                {
                    vantartozasa = true;
                }
            }
            if (tag.tartozik > 0)
            {
                vantartozasa = true;
            }
            if (vantartozasa)
            {
                throw new Exception("A tag nem torolheto mert van konyv vagy penz tartozasa.");
            }
            tagok.Remove(tag);
        }


        /*------------------*/
        /*--konyv elerheto--*/
        /*------------------*/
        public bool KonyvElerheto(string cim) // kesz
        {
            if (cim=="" || cim == null)
                throw new ArgumentException("Meg kell adnod egy velós cimet!");
            int konyvtmp = 0;
            foreach (var k in konyvek)
            {
                if (k.cim == cim)
                {
                    konyvtmp++;
                }
            }
            foreach (var tag in tagok)
            {
                foreach (var kolcson in tag.Kolcsonzesek)
                {
                    foreach (var k in kolcson.kolcsonKonyvek)
                    {
                        if (k.cim == cim)
                        {
                            konyvtmp--;
                        }
                    }
                }
            }
            if (konyvtmp > 0)
            {
                return true;
            }else
            {
                return false;
            }
        }


        /*------------------*/
        /*-------tag_e------*/
        /*------------------*/
        public bool TagE(string nev) // kesz
        {
            if (nev=="" || nev == null)
            {
                throw new Exception("Valodi nevet adj meg!");
            }

            bool talalat = false;
            foreach (var tag in tagok)
            {
                if (tag.nev==nev)
                {
                    talalat = true;
                    break;
                }
            }
            return talalat;
        }
    }
}