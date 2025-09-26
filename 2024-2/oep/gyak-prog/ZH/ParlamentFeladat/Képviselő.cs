using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParlamentFeladat
{
    public class Képviselő
    {
        public string Név { get; }

        public Parlament? Parlament { get; set; }

        public Képviselő(string n)
        {
            Név = n;
        }

        public void Szavaz(bool szavazat, string azon)
        {
            if(Parlament == null)
            {
                throw new ArgumentNullException();
            }
            Parlament.Szavaz(this, szavazat, azon);
        }

    }
}
