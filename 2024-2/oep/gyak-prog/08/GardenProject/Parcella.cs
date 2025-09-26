using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GardenProject
{
    public class Parcella
    {
        private int ultetesIdo;
        private NovenyFajta fajta;

        public void Ultet(NovenyFajta f, int honap)
        {
            if (f == null)
            {
                throw new ArgumentNullException(nameof(f));
            }
            fajta = f;
            ultetesIdo = honap;
        }

        public bool Beerik(int honap)
        {
            return fajta != null && fajta is Zoldseg
                && honap - ultetesIdo == fajta.EresiIdo;
        }

        public void Leszed()
        {
            fajta = null;
        }

    }
}
