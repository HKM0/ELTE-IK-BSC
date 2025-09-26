using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GombKor
{
    internal class Gomb
    {
        private Pont p;
        private double r;

        public Gomb(Pont p, double r)
        {
            this.p = p;
            this.r = r;
        }

        public bool Tartalmaz(Pont q)
        {
            return p.Tavolsag(q) <= r;
        }

        public override string ToString()
        {
            return $"Gömb (Pont: {p}, Sugár: {r})";
            //return "Gömb (Pont:" + p + ", Sugár: " + r + ")";
        }
    }
}
