using System; //FONTOS mivel a beadandók csak ezzel fognak működni! A using a System névteret veszi használatba. A .NET keretrendszer beépített komponensei a System névtérben és annak alárendelt névtereiben találhatóak meg.

namespace p240912 //A program saját definiált névtere.
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Deklaráció
            const int MaxN = 15; 
            int N;
            bool[] almak = new bool[MaxN]; //Üres tömb, aminek maxN eleme van.

            bool vanRohadt;

            Console.WriteLine("Van rossz alma?"); 

            //Bemenet
            Console.Write("N=? :");
            N = Int32.Parse(Console.ReadLine());
            for (int j = 0; j < N; j++)
            {
                Console.Write("A(z) " + (j+1) + ". alma rossz? :");
                string tmp = Console.ReadLine();
                almak[j] = (tmp == "i");
            }

            //Algoritmus implementálása
            int i = 11;
            while ((i < N) && !almak[i])
            {
                i++;
            }
            vanRohadt = (i <= N);

            //Kimenet
            Console.WriteLine((vanRohadt ? "Van" : "Nincs") + " rossz alma");

        }
    }
}




///Console.WriteLine() -> A Console osztály a konzolt reprezentálja, amelybe adatokat tudunk bekérni és azokat kiírni. A Console osztály WriteLine metódusa egy sort ír a képernyőre.
///Tömbök: <adattípus>[] <változónév>
///