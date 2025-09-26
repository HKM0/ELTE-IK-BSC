using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KonyvtarBeadando
{
    public abstract class Konyv
    {
        /*-------------------------------------*/
        /*--------------adattagok--------------*/
        /*-------------------------------------*/
        public string cim { get; private set; }
        public string szerzo { get; private set; }
        public string kiado { get; private set; }
        public string isbn { get; private set; }
        public Ritkasag ritkasag { get; private set; }
        public int kesesdij;


        /*-------------------------------------*/
        /*--------------konstruktor------------*/
        /*-------------------------------------*/
        public Konyv(string cim, string szerzo, string kiado, string isbn, Ritkasag ritkasag)
        {
            this.cim = cim;
            this.szerzo = szerzo;
            this.kiado = kiado;
            this.isbn = isbn;
            this.ritkasag = ritkasag;
            this.kesesdij = Szamolas();
        }


        /*-------------------------------------*/
        /*---------------metodusok-------------*/
        /*-------------------------------------*/
        public abstract int Szamolas();

    }
    public class Termeszettudomanyi : Konyv
    {
        public Termeszettudomanyi(string cim, string szerzo, string kiado, string isbn, Ritkasag ritkasag) : base(cim, szerzo, kiado, isbn, ritkasag) { }
        public override int Szamolas()
        {
            return ritkasag.GetFactor(this);
        }
    }
    public class Szepirodalmi : Konyv
    {
        public Szepirodalmi(string cim, string szerzo, string kiado, string isbn, Ritkasag ritkasag): base(cim, szerzo, kiado, isbn, ritkasag) { }

        public override int Szamolas()
        {
            return ritkasag.GetFactor(this);
        }
    }

    public class Ifjusagi : Konyv
    {
        public Ifjusagi(string cim, string szerzo, string kiado, string isbn, Ritkasag ritkasag) : base(cim, szerzo, kiado, isbn, ritkasag) { }

        public override int Szamolas()
        {
            return ritkasag.GetFactor(this);
        }
    }
}
