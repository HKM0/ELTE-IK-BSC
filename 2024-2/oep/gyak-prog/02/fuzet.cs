namespace gyak22
{
    public enum EFuzetTipus
    {
        sima,
        vonalas,
        kockas,
    }

    public class Fuzet
    {
        public EFuzetTipus Tipus { get; set; }
        private List<string> Lapok { get; set; }

        public Fuzet(int n, EFuzetTipus tip)
        {
            Tipus = tip;
            Lapok = new List<string>(new string[n]);
        }

        public int LapDB() // lapok száma
        {
            return Lapok.Count;
        }

        public int UresDB() // üres lapok száma
        {
            int db = 0;
            for (int i = 0; i < Lapok.Count; i++)
            {
                if (Lapok[i] == null)
                {
                    db += 1;
                }
            }
            return db;
        }

        public void Rair(int ind, string tart) //írás a megadott index alapján
        {
            if (ind >= 0 && ind < Lapok.Count)
            {
                Lapok[ind] = tart;
            }
            else {
                throw new IndexOutOfRangeException("Nincs ennyi lap");
            }

        }

        public void Kitep(int ind) //törlés a megadott index alapján
        {
            if (ind >= 0 && ind < Lapok.Count)
            {
                Lapok.RemoveAt(ind);
            }
        }

        public (bool, int) Keres(string tart) //adok egy tuple-t
        {
            int index = Lapok.IndexOf(tart); //vissza adom a keresett elem indexét
            bool talalt = index != -1; //ha az index -1 akkor nem találta az elemet
            return (talalt, index);
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            Fuzet fuzet = new Fuzet(100, EFuzetTipus.sima); // pl 100 lapos sima füzettel

            //megírok néhány lapot
            fuzet.Rair(0, "Első bejegyzés");
            fuzet.Rair(1, "Második bejegyzés");


            Console.WriteLine($"lapok száma: {fuzet.LapDB()}");
            Console.WriteLine($"üres lapok száma: {fuzet.UresDB()}");
            string tmp = "Második bejegyzés";
            var (talalat, index) = fuzet.Keres(tmp);
            if (talalat)
            {
                Console.WriteLine($"a keresett '{tmp}' a {index+1}. oldalon van.");
            }
            else
            {
                Console.WriteLine("nincs ilyen a füzetben.");
            }

            fuzet.Kitep(1); //kitépek egy lapot a füzetből
            Console.WriteLine($"megmaradt lapok száma: {fuzet.LapDB()}");
        }
    }
}