using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParlamentFeladat
{
    public abstract class Törvényjavaslat
    {
        public string Azon { get; }
        public string Dátum { get; }
        public List<bool> Szavazatok { get; }
        public List<Képviselő> Képviselők { get; }
        public Parlament? Parlament { get; set; }

        protected Törvényjavaslat(string azon, string dátum)
        {
            Azon = azon;
            Dátum = dátum;
            Szavazatok = new();
            Képviselők = new();
        }

        protected int Igenlők()
        {
            int db = 0;
            foreach(bool sz in Szavazatok)
            {
                if(sz) db++;
            }
            return db;
        }

        public abstract bool Érvényese();
    }

    public class Normál : Törvényjavaslat
    {
        public Normál(string azon, string d) : base(azon, d) { }

        public override bool Érvényese()
        {
            return Igenlők() * 2 > Szavazatok.Count;
        }
    }

    public class Sarkalatos : Törvényjavaslat
    {
        public Sarkalatos(string azon, string d) : base(azon, d) { }

        public override bool Érvényese()
        {
            if(Parlament == null) { return false; }
            return Igenlők() * 2 > Parlament.Képviselők.Count;
        }
    }

    public class Alkotmányos : Törvényjavaslat
    {
        public Alkotmányos(string azon, string d) : base(azon, d) { }

        public override bool Érvényese()
        {
            if (Parlament == null || Parlament.Képviselők.Count == 0) { return false; }
            return Igenlők() * 3 >= Parlament.Képviselők.Count * 2;
        }
    }
}
