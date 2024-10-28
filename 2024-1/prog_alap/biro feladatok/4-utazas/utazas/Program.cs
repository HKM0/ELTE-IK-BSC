using System;
namespace utazas
{
    internal class Program
    {
        const int maxn = 100;
        struct Beadat
        {
            public int tav;
            public int ar;
        }

        static void Main(string[] args)
        {
            //beolvasas és adatrendezés
            Console.Error.WriteLine("Hány út van összesen\tV: ");
            int utakszama = Int32.Parse(Console.ReadLine());
            Beadat[] k = new Beadat[maxn];
            for (int i = 0; i < utakszama; i++) {
                Console.Error.WriteLine($"{i + 1}.út [hossza] [ára]\tV: ");
                string[] tmp = Console.ReadLine().Split(" ");
                k[i].tav = Int32.Parse(tmp[0]);
                k[i].ar = Int32.Parse(tmp[1]);
            }

            /*
            a) a legtávolabbi város sorszámát (ha több is van, akkor a legkisebb sorszámút); */
            int legtavolabbi = 0;
            for (int i = 1; i < utakszama; i++)
            {
                if (k[legtavolabbi].tav < k[i].tav)
                {
                    legtavolabbi = i;
                }
            }
            Console.WriteLine(legtavolabbi + 1);

            /*
            b) az 1000 kilométernél közelebbi városok közül mennyi a legdrágább jegy ára; */
            int legdragabbjegyid = -1;
            for (int i = 0; i < utakszama; i++)
            {
                if (k[i].tav < 1000)
                {
                    if (legdragabbjegyid == -1 || k[i].ar > k[legdragabbjegyid].ar)
                    {
                        legdragabbjegyid = i;
                    }
                }
            }
            if (legdragabbjegyid != -1) { Console.WriteLine(k[legdragabbjegyid].ar); }
            else {Console.WriteLine("-1");}

            /*
            c) hányféle olyan ár van, amelyről egyértelmű, hogy melyik városba lehet utazni ennyiért; */
            //elég szar a megfogalmazás, de az egyedi árak kellenek.
            int egyediutak = 0;
            for (int i = 0; i < utakszama; ++i)
            {
                bool egyedi = true;
                for (int j = 0; j < i; j++)
                {
                    if (k[i].ar == k[j].ar) 
                    {
                        egyedi = false; 
                    }
                }
                if (egyedi) { egyediutak++; }
            }
            Console.WriteLine(egyediutak);


            /*
            d) azon városok számát és sorszámait, ahova a kilométerenkénti ár nagyobb 100 forintnál 
                (a sorszámokat növekvő sorrendben) egy-egy szóközzel elválasztva! */
            int[] nagyobb100 = new int[utakszama];
            int kmar100szamlalo = 0;
            for (int i = 0; i < utakszama; i++)
            {
                if ((k[i].ar / k[i].tav) >= 100)
                {
                    nagyobb100[kmar100szamlalo] = i+1;
                    kmar100szamlalo++;
                } 
            }
            Console.Write(kmar100szamlalo);
            for (int i = 0;i < kmar100szamlalo; i++) { Console.Write($" {nagyobb100[i]}"); }



            //19 perc
        }
    }
}
