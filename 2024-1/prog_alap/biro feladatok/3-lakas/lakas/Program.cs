using System;
namespace lakas
{
    internal class Program
    {
        const int maxn = 100;
        struct Beadat
        {
            public int terulet;
            public int ar;
        }
        static void Main(string[] args)
        {
            //beolvasas
            Beadat[] k = new Beadat[maxn];
            Console.Error.WriteLine("Hány lakás legyen?\tV: ");
            int lakasok = Int32.Parse(Console.ReadLine());
            for (int i = 0; i < lakasok; i++) {
                Console.Error.WriteLine($"Mi a {i+1}. lakás [területe] [ára]\tV: ");
                string[] tmp = Console.ReadLine().Split(' ');
                k[i].terulet = Int32.Parse(tmp[0]);
                k[i].ar = Int32.Parse(tmp[1]);
            }

            //feladatok:

            /*
             a) a legdrágább lakás sorszámát (ha több megoldás van, akkor közülük a legkisebb sorszámút); */
            int maxarindex = 0;
            for (int i = 1; i < lakasok; i++) { 
                if (k[i].ar > k[maxarindex].ar)
                {
                    maxarindex = i;
                }
            }
            Console.WriteLine(maxarindex+1);

            /*
            b) a 100 négyzetméternél nagyobbak közül a 40 millió forintnál olcsóbbak számát; */
            int nagyobb100olcsobb40 = 0;
            for (int i = 0; i < lakasok; i++) {
                if (k[i].terulet > 100 && k[i].ar < 40) { 
                    nagyobb100olcsobb40++;
                }
            }
            Console.WriteLine(nagyobb100olcsobb40);

            /*
            c) hányféle alapterületű lakás van; */
            int egyediekszama = 0;
            for (int i = 0; i < lakasok; i++) { 
                bool egyedi = true;
                for (int j = 0; j < i; j++)
                {
                    if (k[i].terulet == k[j].terulet)
                    {
                        egyedi = false;
                    }
                }
                if (egyedi) {
                    egyediekszama++;
                }
            }
            Console.WriteLine(egyediekszama);

            /*
            d) a 100 millió forintnál drágább lakások számát és sorszámait 
                (a sorszámokatnövekvő sorrendben) egy-egy szóközzel elválasztva!*/
            int dragabb100 = 0;
            int[] dragak = new int[lakasok];
            for (int i = 0; i < lakasok; i++) {
                if (k[i].ar > 100) {
                    dragak[dragabb100] = i+1;
                    dragabb100++;
                }
            }
            Console.Write(dragabb100);
            for (int i = 0; i < dragabb100; i++) { Console.Write($" {dragak[i]}"); }



         // 10 perc
        }
    }
}
