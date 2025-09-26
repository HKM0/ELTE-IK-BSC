namespace CactusFeladat
{
    public struct Cactus
    {
        public string nev, szin, os;
        public int meret;

        public Cactus(string nev, string szin, string os, int meret)
        {
            this.nev = nev;
            this.szin = szin;
            this.os = os;
            this.meret = meret;
        }
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            var file = new CactusReader("cactus.txt");

            List<string> pirosak = new List<string>();
            List<string> mexikoiak = new List<string>();

            Cactus? cactus;
            while ((cactus = file.Next()) != null)
            {
                if(cactus?.szin == "red")
                {
                    pirosak.Add(cactus?.nev);
                }
                if(cactus?.os == "Mexico")
                {
                    mexikoiak.Add(cactus?.nev);
                }
            }

            Console.Write("Pirosak: ");
            foreach(var piros in pirosak)
            {
                Console.Write(piros + " ");
            }
            Console.WriteLine();

            Console.Write("Mexikoiak: ");
            foreach (var mexikoi in mexikoiak)
            {
                Console.Write(mexikoi + " ");
            }
            Console.WriteLine();


        }
    }
}
