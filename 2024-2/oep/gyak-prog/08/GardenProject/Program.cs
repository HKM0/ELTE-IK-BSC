namespace GardenProject
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Kert kert = new(5);
            kert.Ultet(3, Burgonya.Instance(), 3);
            var szedheto = kert.Szedheto(6);
            Console.WriteLine(szedheto[0]);
            kert.Leszed(3);

            Console.WriteLine(Burgonya.Instance().IsZoldseg());
            Console.WriteLine(Burgonya.Instance().IsVirag());
        }
    }
}
