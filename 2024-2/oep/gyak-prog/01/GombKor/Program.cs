namespace GombKor
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Pont p = new Pont(2, 1, 2);
            Pont q = new Pont(3, 4, -1.5);

            Console.WriteLine(p.Tavolsag(q));

            Pont v = new Pont(5, 1, 2);

            Console.WriteLine(p.Tavolsag(v));

            Console.WriteLine(Pont.Tavolsag(p, q));

            Console.WriteLine(p);

            Gomb g = new Gomb(p, 10);

            Console.WriteLine(g);
        }
    }
}
