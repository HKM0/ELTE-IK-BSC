using System;

namespace gyak02
{

    internal class Program 
    {   
        static void Main(string[] args)
        {
            const int MaxN = 15;
            bool[] alma = new bool[MaxN];
            int N;
            bool vanRohadt;
            Console.WriteLine("Hány alma van?");
            Console.Write("N=? ");
            N = Int32.Parse(Console.ReadLine());

            for(int j = 0; j < N; j++)
            {
            Console.Write("A(z) "+(j+1)+". alma rohadt?");
            string tmp = Console.ReadLine();
            alma[j] = (tmp == "i");
            }
            int i = 11;
            while (i < N && !alma[i])
            {
                i++;
            }
            vanRohadt = (i<=N);
            Console.WriteLine((vanRohadt ? "Igen": "Nincs") + "rohadt alma");
        }
    }
}