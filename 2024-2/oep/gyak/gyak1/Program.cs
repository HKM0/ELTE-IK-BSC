using System.Drawing;

namespace gyak1
{

    internal class Pont
    {
        private double x;
        private double y;
        private double z;

        public Pont(double x, double y, double z) { 
            this.x = x;  //elég az x = _x;
            this.y = y; 
            this.z = z;
        }
        public double Tavolsag(Pont q) {
            return Math.Sqrt(
                Math.Pow(x - q.x, 2) +
                Math.Pow(y - q.y, 2) +
                Math.Pow(z - q.z, 2)
                );
        }

        }
    class Gomb
    {
        private Pont c;
        private double r;

        public Gomb(Pont c, double r)
        {
            this.c = c;
            this.r = r;
        }

        public bool Tartalmaz(Pont p)
        {
            return c.Tavolsag(p) < r;
        }

        public override string ToString()
        {
            return $"Gomb: (Pont: {c}, Sugár: {r})";
        }
    }


    internal class Program
    {
        public static void Main(string[] args)
        {
            Pont p = new Pont(2, 1, 2);
            Pont q = new Pont(3, 4, -1.5);
            Pont v = new Pont(1, 5, 7);
            Console.WriteLine(p.Tavolsag(q));
            Console.WriteLine(p.Tavolsag(v));

            Gomb g = new Gomb(new Pont(0, 0, 0), 5);
            Console.WriteLine(g.Tartalmaz(p));
            //Console.WriteLine(Pont.Tavolsag(q,v));

            Console.WriteLine("Hello, World!");
        }
    }
}
