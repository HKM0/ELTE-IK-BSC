using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParlamentFeladat
{
    public class Parlament
    {
        public List<Képviselő> Képviselők { get; }
        public List<Törvényjavaslat> Javaslatok { get; }


        public Parlament(List<Képviselő> képviselők)
        {
            Képviselők = new();
            foreach (Képviselő k in képviselők)
            {
                bool van = false;
                foreach (Képviselő m in Képviselők)
                {
                    if (m == k)
                    {
                        van = true;
                        break;
                    }
                }
                //van = Képviselők.Contains(k);
                if (!van)
                {
                    Képviselők.Add(k);

                    k.Parlament = this;
                }
            }
            Javaslatok = new();
        }

        public void Benyújt(Törvényjavaslat t)
        {
            foreach (Törvényjavaslat j in Javaslatok)
            {
                if (j.Azon == t.Azon)
                {
                    throw new ArgumentException();
                }
            }
            Javaslatok.Add(t);
            t.Parlament = this;
        }

        public void Szavaz(Képviselő k, bool szavazat, string azon)
        {
            Törvényjavaslat? t = null;
            foreach (Törvényjavaslat j in Javaslatok)
            {
                if (j.Azon == azon)
                {
                    t = j;
                    break;
                }
            }
            if (t == null)
            {
                throw new MissingMemberException();
            }
            if (!Képviselők.Contains(k))
            {
                throw new ArgumentException();
            }
            t.Képviselők.Add(k);
            t.Szavazatok.Add(szavazat);
        }

        public List<string> Érvényesek()
        {
            var list = new List<string>();
            foreach(Törvényjavaslat t in Javaslatok)
            {
                if (t.Érvényese())
                {
                    list.Add(t.Azon);
                }
            }
            return list;
        }
    }
}
