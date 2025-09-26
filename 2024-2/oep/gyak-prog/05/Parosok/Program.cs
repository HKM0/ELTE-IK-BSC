namespace Parosok
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var text = File.ReadAllText("szamok.txt");
            var data = text.Split().Select(x => int.Parse(x)).ToList();

            int m = 0;
            bool l = false;
            foreach (var e in data)
            {
                if(e > m)
                {
                    m = e;
                }
                l = l || e % 2 == 0;
            }
            Console.WriteLine(m);
            Console.WriteLine(l);
        }
    }
}
