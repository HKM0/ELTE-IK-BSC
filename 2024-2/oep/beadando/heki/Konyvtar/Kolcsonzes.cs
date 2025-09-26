using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KonyvtarBeadando
{
    public class Kolcsonzes
    {
        /*-------------------------------------*/
        /*--------------adattagok--------------*/
        /*-------------------------------------*/
        public DateTime KolcsonzesDatum { get; private set; }
        public DateTime KolcsonzesVege { get; private set; }
        public List<Konyv> kolcsonKonyvek { get; private set; }
        public Tag kicsoda { get; private set;}

        /*-------------------------------------*/
        /*-------------konstruktor-------------*/
        /*-------------------------------------*/
        public Kolcsonzes(DateTime kolcsonzesDatum, DateTime kolcsonzesVege, List<Konyv> kolcsonKonyvek, Tag kicsoda)
        {
            this.KolcsonzesDatum = kolcsonzesDatum;
            this.KolcsonzesVege = kolcsonzesVege;
            this.kolcsonKonyvek = kolcsonKonyvek;
            this.kicsoda = kicsoda;
        }
        public Kolcsonzes(DateTime kolcsonzesDatum, DateTime kolcsonzesVege, Konyv konyv, Tag kicsoda)
        {
            this.KolcsonzesDatum = kolcsonzesDatum;
            this.KolcsonzesVege = kolcsonzesVege;
            this.kolcsonKonyvek = new List<Konyv>();

            if (konyv != null)
            {
                this.kolcsonKonyvek.Add(konyv);
            }
            else
            {
                throw new Exception("Null erteket adtal meg.");
            }

            this.kicsoda = kicsoda;
        }


        /*-------------------------------------*/
        /*---------------metodusok-------------*/
        /*-------------------------------------*/

        /*------------------*/
        /*----kesesi dij----*/
        /*------------------*/
        public int KesesiDijSzamolasa(DateTime d1, DateTime d2)
        {
            return Math.Abs((d2-d1).Days);
        }

        /*------------------*/
        /*--konyvHozzaadas--*/
        /*------------------*/
        public void KonyvHozzaadas(Konyv konyv)
        {
            if (konyv == null)
                throw new Exception($"Null eretket adtal meg.");

            int tmp = 0;
            foreach (var kolcson in kicsoda.Kolcsonzesek)
            {
                foreach (var k in kolcsonKonyvek)
                {
                    tmp++;
                }
            }
            if (5 - kolcsonKonyvek.Count - tmp > 0)
            {
                kolcsonKonyvek.Add(konyv);
            }
        }
        
        /*------------------*/
        /*---konyvElvetel---*/
        /*------------------*/
        public int KonyvVisszahozas(Konyv konyv, Tag kicsoda)
        {
            if (konyv == null)
                throw new Exception($"Null eretket adtal meg.");
            if (kolcsonKonyvek.Contains(konyv))
            {
                int tmp = konyv.Szamolas();
                kolcsonKonyvek.Remove(konyv);
                return tmp;
            }
            else
            {
                throw new Exception($"Nincs \"{konyv.cim}\" cimu konyv kikolcsonozve.");
            }
        }
    }
}
