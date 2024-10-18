using System;
using System.Diagnostics.Tracing;

namespace BojlerElado
{
    internal class Program
    {
        const int MaxN = 100;

        struct BeAdat
        {
            public int kor;
            public int fiz;
        }
        static int maxkor(BeAdat[] k) {
        
            int Z = 0;
            for (int i = 0; i< k.Length; i++)
            {
                if (k[i].kor >= Z)
                {
                    Z = k[i].kor;
                }
            }
            return Z;
        }

        static int ki40(BeAdat[] k)
        {
            int Z = 0;
            for (int i = 0;i < k.Length; i++)
            {
                if (k[i].kor > 40 && k[i].fiz < 300)
                {
                    Z=i;
                    break;
                }
            }            
            return Z;
        }
        static int hanyfele(BeAdat[] k)
        {
            int Z = 0;
            for (int i = 0; i < k.Length; i++)
            {
                for (int j = 0; j < k[i].kor; j++)
                {
                    if (k[i].kor == k[j].kor)
                    {
                        Z += 1;
                    }

                }
            }
            return Z-(Z-k.Length);
        }
        static void kik30(BeAdat[] k) { 
            int Z = 0;
            for (int i = 0; i < k.Length; i++)
            {
                if (k[i].kor > 30) {
                    Z+=1;
                }
            }
            Console.WriteLine($"{Z}");
            for (int i = 0; i > k.Length; i++)
            {
                if (k[i].kor < 30)
                {
                    Console.WriteLine($" {i+1}");
                }
            }
        }




        static void Main(string[] args)
        {
            BeAdat[] k = new BeAdat[MaxN];

            // beolvasas
            Console.Error.WriteLine("Kérem a dolgozók számát. V: ");
            int dolgozokszama = Int32.Parse(Console.ReadLine());

            Console.Error.WriteLine("Kerem az adatokat, soronkent: [kor] [fizetes]");
            for (int i = 0; i < dolgozokszama; i++)
            {
                string[] tmp = Console.ReadLine().Split(' ');
                k[i].kor = Int32.Parse(tmp[0]);
                k[i].fiz = Int32.Parse(tmp[1]);
            }

            // beolvasás teszt
            Console.Error.WriteLine($"Osszesen {dolgozokszama} darab munkas van");
            for (int j = 0; j < dolgozokszama; j++)
            {
                Console.Error.WriteLine($"Kor: {k[j].kor}, Fizetes: {k[j].fiz}");
            }

            //feladat megoldás
            

        }   
    }
}

