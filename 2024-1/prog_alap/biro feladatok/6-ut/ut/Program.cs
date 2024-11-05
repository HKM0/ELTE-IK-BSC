using System;
namespace ut
{
    internal class Program
    {
        const int maxn = 200;
        struct beadat
        {
            public int kezdes;
            public int vege;
        }
        static void Main(string[] args)
        {
            //bekeres és rendezes   
            Console.Error.WriteLine("Kérem az adatokat, [úthossz] [alkalmak száma]\tV: ");
            beadat[] k = new beadat[maxn];
            string[] tmp = Console.ReadLine().Split(" ");
            int teljeshossz = Int32.Parse(tmp[0]);
            int alkalomszam = Int32.Parse(tmp[1]);
            for (int i = 0; i < alkalomszam; i++)
            {
                Console.Error.WriteLine($"Kérem a(z) {i + 1} felújítás adatait\tV: ");
                tmp = Console.ReadLine().Split(" ");
                k[i].kezdes = Int32.Parse(tmp[0]);
                k[i].vege = Int32.Parse(tmp[1]);
            }


            //feladatok
            /*  a) a legrövidebb felújítás hosszát (Vi- Ki); 1 */
            int minhossz = k[0].vege - k[0].kezdes;
            for (int i = 1; i < alkalomszam; i++)
            {
                if (k[i].vege - k[i].kezdes < minhossz)
                {
                    minhossz = k[i].vege - k[i].kezdes;
                }
            }
            Console.WriteLine(minhossz);

            /*  b) az első kilométerszelvény kezdetét, ahol legalább háromszor volt felújítás
                        (ha nincs ilyen, akkor a -1 számot kell kiírni); 2 */
            int[] javiotottreszek = new int[teljeshossz];
            for (int i = 0; i < alkalomszam; i++)
            {
                for (int j = k[i].kezdes; j < k[i].vege; j++)
                {
                    javiotottreszek[j]++;
                }
            }
            int harmasjavitas = -1;
            for (int i = 0; i < teljeshossz; i++)
            {
                if (javiotottreszek[i] >= 3)
                {
                    harmasjavitas = i;
                    break;
                }
            }
            if (harmasjavitas != -1) { Console.WriteLine(harmasjavitas); }
            else { Console.WriteLine(-1); }



            /*  c) hány kilométeren kellene még aszfaltozni, hogy az út teljesen fel legyen újítva; 3*/
            bool[] javitottlista = new bool[teljeshossz];
            for (int i = 0; i < alkalomszam; i++)
            {
                for (int j = k[i].kezdes; j < k[i].vege; j++)
                {
                    javitottlista[j] = true;
                }
            }
            int nemjavitott = 0;
            for (int i = 0; i < teljeshossz; i++)
            {
                if (!javitottlista[i])
                {
                    nemjavitott++;
                }
            }
            Console.WriteLine(nemjavitott);



            /*  d) a leghosszabb útszakasz hosszát, ahol egyszer sem volt felújítás! */
            int leghoszabbnemjavitott = 0, eppennemjavitott = 0;
            for (int i = 0; i < teljeshossz; i++)
            {
                if (!javitottlista[i])
                {
                    eppennemjavitott++;
                }
                else
                {
                    if (eppennemjavitott > leghoszabbnemjavitott)
                    {
                        leghoszabbnemjavitott = eppennemjavitott;
                    }
                    eppennemjavitott = 0;
                }
            }
            if (eppennemjavitott > leghoszabbnemjavitott)
            {
                leghoszabbnemjavitott = eppennemjavitott;
            }
            Console.WriteLine(leghoszabbnemjavitott);
        }
    }
}