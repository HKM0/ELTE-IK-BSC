namespace Base
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Adagoló maximum tartalma, adag mennyisége és megnyomások száma:");
            string[] input = Console.ReadLine().Split();
            double max = double.Parse(input[0]);
            double dose = double.Parse(input[1]);
            int presses = int.Parse(input[2]);
            Dispenser test = new Dispenser(max, dose);
            Console.WriteLine(test.IsEmpty());
            test.Fill();
            Console.WriteLine(test.IsEmpty());
            for(int i = 0; i < presses; i++)
            {
                test.Push();
            }
            Console.WriteLine(test.IsEmpty());
        }
    }
}
