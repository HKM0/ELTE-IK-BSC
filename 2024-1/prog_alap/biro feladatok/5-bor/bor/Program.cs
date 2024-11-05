using System;
namespace bor
{
    internal class Program
    {
        const int maxn = 100;
        struct Beadat
        {
            public int mennyiseg;
            public int ar;
        }
        static void Main(string[] args)
        {
            //beolvasás és adatrendezés
            Beadat[] k = new Beadat[maxn];
            Console.Error.WriteLine("Hány év van összesen\tV: ");
            int evekszama = Int32.Parse(Console.ReadLine());
            for (int i = 0; i < evekszama; i++) {
                Console.Error.WriteLine($"Kérem a(z) {i+1}. év [mennyiségét] [árát]\tV: ");
                string[] tmp = Console.ReadLine().Split(' ');
                k[i].mennyiseg = Int32.Parse(tmp[0]);
                k[i].ar = Int32.Parse(tmp[1]);
            }
            //feladatok:
            /*  a) a legkisebb termésű év sorszámát (ha több megoldás is van, 
                    akkor közülük a legkisebb sorszámút); 1*/
            int piciteremtesxd = 0;
            for (int i = 1; i < evekszama; i++) { 
                if (k[piciteremtesxd].mennyiseg > k[i].mennyiseg)
                {
                    piciteremtesxd=i;
                }
            }
            Console.WriteLine(piciteremtesxd + 1);

            /*  b) az 1000 liternél nagyobb termésű években mennyi a maximális ár; 2 */
            int maxid = 0;
            bool van1000nelnagyobb = false;
            for (int i = 0; i < evekszama; i++)
            {
                if (van1000nelnagyobb != true && k[i].mennyiseg > 1000)
                {
                    maxid = i;
                    van1000nelnagyobb=true;
                }
                if (k[i].mennyiseg > 1000 && k[i].ar > k[maxid].ar &&van1000nelnagyobb != false)
                {
                    maxid = i;
                }
            }
            if (van1000nelnagyobb) { Console.WriteLine(k[maxid].ar); }
            else { Console.WriteLine(-1); }

            /*  c) a pincészet hányféle áron árul bort; 3*/
            int egyediarak = 0;
            for (int i = 0; i < evekszama; i++) {
                bool egyedi = true;
                for (int j = 0; j < i; j++)
                {
                    if (k[i].ar == k[j].ar) {
                        egyedi = false;
                    }
                }
                if (egyedi) { egyediarak++; }
            }
            Console.WriteLine(egyediarak);

            /*  d) azon évek számát és sorszámait, amikor többet készítettek, 
                    mint bármely korábbi évben (ha volt egyáltalán korábbi év; 
                    a sorszámokat növekvő sorrendben) egy-egy szóközzel elválasztva!*/
            int[] sokatkeszitoevek = new int[evekszama];
            int hanyilyenevvolt = 0;
            int maxtermid = 0;

            for (int i = 0; i < evekszama; i++)
            {
                if (k[i].mennyiseg > k[maxtermid].mennyiseg)
                {
                    maxtermid = i;
                    sokatkeszitoevek[hanyilyenevvolt] = i + 1;
                    hanyilyenevvolt++;
                }
            }

            Console.Write(hanyilyenevvolt);
            for (int i = 0; i < hanyilyenevvolt; i++)
            {
                Console.Write(" "+sokatkeszitoevek[i]);
            }



            // 18:31 perc
        }
    }
}
