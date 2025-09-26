namespace HorgaszVerseny
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Thread.CurrentThread.CurrentCulture =
                System.Globalization.CultureInfo.InvariantCulture;

            FisherReader reader = new FisherReader(args[0]);

            bool l = false;
            string nev = "";
            Fisher? f;
            while (!l && (f = reader.Next()) != null)
            {
               if(f.PontySuly() >= 10)
                {
                    l = true;
                    nev = f.Name;
                }
            }
            if (l)
            {
                Console.WriteLine(nev);
            }
            else
            {
                Console.WriteLine("Nincs");
            }
        }

        // static double PontySuly(List<Fish> catches) { }
    }
}
