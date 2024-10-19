using System;
namespace Bandiszenved
{
    /*
     * Egy rendezvényre N vendég érkezik, ismerjük mindegyikük érkezési és távozási idejét. 
     * Számold meg, hogy a K. időpontban hány vendég van a rendezvényen!
    */
    internal class Program
    {
        const int MaxN = 100;

        struct Vendégek
        {
            public int erkezes;
            public int tavozas;
        }

        //beolvasás
        static void beolvas(out int vendegszam, out int ido, ref Vendégek[] k)
        {
            Console.Error.Write("Kérem a [vendégek számát] [időt percben]: ");
            string[] beállítások = Console.ReadLine().Split(' ');
            vendegszam = Int32.Parse(beállítások[0]);
            ido = Int32.Parse(beállítások[1]);

            for (int i = 0; i < vendegszam; i++)
            {
                Console.Error.WriteLine($"Kérem a(z) {i + 1}. vendég: [érekzését] [távozását] ");
                string[] tmp = Console.ReadLine().Split(' ');
                k[i].erkezes = Int32.Parse(tmp[0]);
                k[i].tavozas = Int32.Parse(tmp[1]);
            }
        }
        //algoritmus
        static int bentosszesen(ref Vendégek[] k, int vendegszam, int ido)
        {
            int bentivendegek = 0;

            for (int i = 0; i < vendegszam; i++)
            {
                if (k[i].erkezes < ido && k[i].tavozas > ido)
                {
                    bentivendegek++;
                }
            }

            return bentivendegek;
        }

        static void Main(string[] args)
        {
            // deklaracio
            int vendegszam = 0;
            int ido = 0;
            Vendégek[] k = new Vendégek[MaxN];

            beolvas(out vendegszam, out ido, ref k);

            // kiiras
            Console.WriteLine(bentosszesen(ref k, vendegszam, ido));

        }
    }
}
