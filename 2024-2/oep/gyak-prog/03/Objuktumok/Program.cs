namespace Objuktumok
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Siker: " + TestTanul());
        }

        static bool TestTanul()
        {
            bool jo = true;

            Hallgato h = new(130, "X");

            Console.WriteLine(h.Iq);
            jo = jo && h.Iq == 130;
            h.Tanul();
            Console.WriteLine(h.Iq);
            jo = jo && h.Iq == 150;
            h.Tanul();
            Console.WriteLine(h.Iq);
            jo = jo && h.Iq == 170;
            h.Tanul();
            Console.WriteLine(h.Iq);
            jo = jo && h.Iq == 190;
            h.Tanul();
            Console.WriteLine(h.Iq);
            jo = jo && h.Iq == 200;
            h.Tanul();
            Console.WriteLine(h.Iq);
            jo = jo && h.Iq == 200;
            h.Tanul();
            Console.WriteLine(h.Iq);
            jo = jo && h.Iq == 200;

            return jo;
        }
    }
}
