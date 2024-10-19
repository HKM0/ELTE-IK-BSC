using System;
using System.Collections.Generic;
namespace KomplexBeadandoFeladatRendes
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Az első sor bekérése és ellenőrzése.

            string[] elsosor = Console.ReadLine().Split(' ');
            int N = int.Parse(elsosor[0]);
            int M = int.Parse(elsosor[1]);

            if (!(N >= 1 && N <= 1000)) // A települések számának ellenőrzése.
            {
                Console.Error.WriteLine("Az települések számának(első sor, első számjegy) legalább 1-nek és legfeljebb 1000-nek kell lennie!");
            }

            else if (!(M >= 1 && M <= 1000)) // A napok számának ellenőrzése.
            {
                Console.Error.WriteLine("Az települések számának(első sor, második számjegy) legalább 1-nek és legfeljebb 1000-nek kell lennie!");
            }

            // Ha mindkettő megfelel a feltételnek, a program továbbmegy.

            else
            {
                // Adatok bekérése és ellenőrzése.

                int[,] H = new int[N, M];
                bool HibasBemenet = false;
                int sor = 0;
                int oszlop = 0;

                for (int i = 0; i < N; i++)
                {
                    string[] tobbisor = Console.ReadLine().Split(' ');
                    for (int j = 0; j < M; j++)
                    {
                        H[i, j] = int.Parse(tobbisor[j]);
                        if (H[i, j] > 50 || H[i, j] < -50)
                        {
                            HibasBemenet = true;
                            sor = i + 1;
                            oszlop = j + 1; // A hibás adat oszlopának és sorának elmentése.   
                            goto vege; // A teljes adatbekérés megállítása.
                        }
                    }
                }
                vege:

                if (HibasBemenet) // Ha hibát talált, akkor írja ki hol és miért. Ezután a program kilép.
                {
                    Console.Error.WriteLine("A mátrix {0}. sorának, {1}. adata nem felelt meg a feltételnek. Minden adat legalább -50 és legfeljebb 50 lehet!", sor, oszlop);
                }

                // Egyéb esetben, a program sikeresen bekért minden adatot és továbbmegy.
                else
                {

                    // A feladat megoldása.

                    int K = 0; // A napok száma.

                    List<int> S = new List<int>(); // Dinamikus tömb a sorszámoknak.

                    for (int i = 1; i < M; i++)
                    {
                        int segedDB = 0;
                        for (int j = 0; j < N; j++)
                        {
                            if (H[j, i] > H[j, i - 1]) // Ha az adott napon nagyobb volt a hőmérséklet, mint a elöző napon:
                            {
                                segedDB++; // Akkor a segedDB-t növelje meg eggyel.
                            }
                        }
                        if (segedDB >= (N / 2.0)) // Ha a települések legalább felében nagyobb volt a hőmérséklet, mint a elöző napon(Páratlan település szám esetén is működik):
                        {
                            K++;
                            S.Add(i + 1); // Akkor az aktuális nap számát adjuk hozzá a dinamikus tömbhöz és a K-t növeljük meg eggyel.
                        }
                    }

                    // A K és a napok(ha vannak) kiírása.

                    Console.Write("{0} ", K);

                    for (int i = 0; i < K; i++)
                    {
                        Console.Write("{0} ", S[i]);
                    }
                }
            }
        }
    }
}