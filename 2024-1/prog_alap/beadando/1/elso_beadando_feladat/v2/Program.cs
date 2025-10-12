namespace Elsobeadandomasodikverz
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int N;
            int.TryParse(Console.ReadLine(), out N);

            int[] Kukutyin = new int[N];
            int[] Piripocs = new int[N];
            int db = 0;
            for (int i = 0; i < N; i++)
            {
                string[] kettoadat = Console.ReadLine().Split(' ');
                Kukutyin[i] = int.Parse(kettoadat[0]);
                Piripocs[i] = int.Parse(kettoadat[1]);
                if (Kukutyin[i] < Piripocs[i])
                {
                    db++;
                }
            }
            Console.WriteLine("{0}", db);
        }
    }
}