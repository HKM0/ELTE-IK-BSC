using System;

namespace emberek
{
    internal class Program
    {
        const int maxn = 100;
        struct Beadat
        {
            public int kor;
            public int fiz;
        }
        static void Main(string[] args)
        {

            //beolvasás és adatrendezés
            Beadat[] k = new Beadat[maxn];
            Console.Error.WriteLine("Hány embi legyen? \tV: ");
            int dolgozoszam = Int32.Parse(Console.ReadLine());
            for (int i = 0; i < dolgozoszam; i++)
            {
                Console.Error.WriteLine($"Add meg a(z) {i + 1}. dolgozó [korát] [fizetését]\tV: ");
                string[] tmp = Console.ReadLine().Split(' ');
                k[i].kor = Int32.Parse(tmp[0]);
                k[i].fiz = Int32.Parse(tmp[1]);
            }
            
            //feladatok
            /*  a) a legidősebb dolgozó sorszámát (ha több megoldás van, 
                    akkor közülük a legkisebb sorszámút); 1  */
            int MaxKorIndex = 0;
            for (int i = 1; i < dolgozoszam; i++) { 
                if (k[MaxKorIndex].kor < k[i].kor)
                {
                    MaxKorIndex = i;
                }
            }
            Console.WriteLine(MaxKorIndex+1);

            /*  b) a 40 év felettiek közül hánynak van 200.000 forintnál kisebb fizetése; 2 */
            int Hany_40felett_200alatt = 0;
            for (int i = 0; i < dolgozoszam; i++) { 
                if (k[i].kor > 40 && k[i].fiz < 200000)
                {
                    Hany_40felett_200alatt++;
                }
            }
            Console.WriteLine(Hany_40felett_200alatt);

            /*  c) hányféle életkorú ember van; 3   */
            int hanykulonbozo = 0;
            for (int i = 0; i < dolgozoszam; i++)
            {
                bool egyedi = true;  
                for (int j = 0; j < i; j++)
                {
                    if (k[i].kor == k[j].kor)
                    { 
                        egyedi = false;
                        break;  
                    }
                }
                if (egyedi)
                {
                    hanykulonbozo++; 
                }
            }
            Console.WriteLine(hanykulonbozo);

            /*  d) a 30 évnél fiatalabbak számát és sorszámait 
                (a sorszámokat növekvő sorrendben) egy-egy szóközzel elválasztva!   */
            int[] fiatalok = new int[dolgozoszam];
            int fiatalabb30nal = 0;
            for (int i = 0; i < dolgozoszam; i++) { 
                if (k[i].kor < 30)
                {
                    fiatalok[fiatalabb30nal] = i+1;
                    fiatalabb30nal++;
                }
            }
            Console.Write(fiatalabb30nal);
            for (int i = 0; i < fiatalabb30nal; i++) {Console.Write($" {fiatalok[i]}");}

            //kb 20p
        }
    }
}
