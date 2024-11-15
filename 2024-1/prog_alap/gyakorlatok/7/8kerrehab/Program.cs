using System;
namespace ConsoleApp1
{
    internal class Program
    {
        //deklaráció
        const int MaxN = 100;

        struct BeAdat
        {
            public int terulet;
            public int ar;
        }

        static void Main(string[] args)
        {
            BeAdat[] k = new BeAdat[MaxN];

            // beolvasas
            Console.Error.WriteLine("Hány ingatlan van? V: ");
            int N = Int32.Parse(Console.ReadLine());

            Console.Error.WriteLine("Kérem az adatokat, soronként: [Terület] [Ár]");
            for (int i = 0; i < N; i++)
            {
                string[] tmp = Console.ReadLine().Split(' ');
                k[i].terulet = Int32.Parse(tmp[0]);
                k[i].ar = Int32.Parse(tmp[1]);
            }

            // beolvasás teszt
            Console.Error.WriteLine($"Házak száma: {N}");
            for (int j = 0; j < N; j++)
            {
                Console.Error.WriteLine($"{j + 1}\t Terület: {k[j].terulet}, ár: {k[j].ar}");
            }

            // műveletek: 

            //A
            int maxid = 0;
            for (int i = 0; i < N; i++)
            {
                if (k[i].ar >= k[maxid].ar)
                {
                    maxid = i;
                }
            }
            //B
            int szaznagyobb40alatt = 0;
            for (int i = 0; i < N; i++)
            {
                if (k[i].terulet > 100 && k[i].ar < 40)
                {
                    szaznagyobb40alatt += 1;
                }
            }
            //C
            int kulonbozoteruletu = 0;
            for (int i = 0; i < N; i++)
            {
                bool egyedi = true;
                for (int j = 0; j < i && egyedi; j++)
                {
                    //tanár úr elkap ha ilyet írsz
                    if (k[i].terulet == k[j].terulet)
                    {
                        egyedi = false;
                    }
                }
                if (egyedi)
                {
                    kulonbozoteruletu++;
                }
            }


        //D
        int[] tmp2 = new int[N];
            int negyvenmiltobb = 0;
            for (int i = 0; i < N; i++)
            {
                if (k[i].ar > 100)
                {
                    tmp2[negyvenmiltobb] = i;
                    negyvenmiltobb++;
                }
            }
            //kiírás
            Console.WriteLine(maxid + 1);
            Console.WriteLine(szaznagyobb40alatt);
            Console.WriteLine(kulonbozoteruletu);
            Console.Write(negyvenmiltobb);
            for (int i = 0; i < negyvenmiltobb; i++)
            {
                Console.Write(" " + (tmp2[i]+1));
            }

        }
    }
}
