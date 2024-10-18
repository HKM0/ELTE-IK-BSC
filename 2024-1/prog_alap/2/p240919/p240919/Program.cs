namespace p240919
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Prím osztók összege");

            int N;
            int S;

            bool hibas = false;
            do
            {
                Console.Write("N=? :");
                //              N = Int32.Parse(Console.ReadLine());
                hibas = ((!Int32.TryParse(Console.ReadLine(), out N)) || (N < 1));
                if (hibas)
                {
                    Console.Error.WriteLine("Hiba 1-nel nagyobb szamot adj meg.");
                }
            } while (hibas);



            S = 0;
            int i = 2;

            while (i <= N)
            {
                if (N % i == 0)
                {

                    S += i;

                    while ((N % i) == 0)
                    {
                        N = N / i; break;
                        Console.WriteLine(N);
                    }
                }

                i += 1;
            }
            Console.WriteLine("S=" + S);
            Console.WriteLine(S);
        }
    }
}
