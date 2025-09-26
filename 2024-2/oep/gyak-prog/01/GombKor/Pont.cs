using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GombKor
{
    internal class Pont
    {
        private double x;
        private double y;
        private double z;

        public Pont(double _x, double y, double z)
        {
            x = _x;
            this.y = y;
            this.z = z;
        }

        public double Tavolsag(Pont q)
        {
            return Math.Sqrt(
                Math.Pow(x - q.x, 2) +
                Math.Pow(y - q.y, 2) +
                Math.Pow(z - q.z, 2));
        }

        public static double Tavolsag(Pont p, Pont q)
        {
            return Math.Sqrt(
                Math.Pow(p.x - q.x, 2) +
                Math.Pow(p.y - q.y, 2) +
                Math.Pow(p.z - q.z, 2));
        }

        public override string ToString()
        {
            return "(" + x + ", " + y + ", " + z + ")";
        }
    }
}
