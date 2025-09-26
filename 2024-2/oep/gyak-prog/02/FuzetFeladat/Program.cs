namespace FuzetFeladat
{
    public class RosszMethodException : Exception { }

    public class RosszMasikMethodException : InvalidOperationException { }

    internal class Program
    {
        static void Main(string[] args)
        {

        }

        static void Kacsa()
        {
            Console.WriteLine("Hello, World!");
            try
            {
                Rossz();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            try
            {
                Rossz2(1);
            }
            catch (ArgumentException e)
            {
                Console.WriteLine("A francba!");
            }
            catch (InvalidOperationException e)
            {
                Console.WriteLine("Huha!");
            }

            try
            {
                Rossz3();
            }
            catch (RosszMethodException e)
            {
                Console.WriteLine("De meno!");
            }

            string[] cucc = new string[3];
            string[] cucc2 = new string[2];
            cucc2[0] = cucc[0];
            cucc2[1] = cucc[1];
            cucc = cucc2;

            List<string> list = new List<string>();

            list.Add("Cucc");
            Console.WriteLine(list[0]);
            Console.WriteLine(list.Count);

            list[0] = "Valami";
            Console.WriteLine(list[0]);
            Console.WriteLine(list.Count);

            list.Add("Halacska");
            list.Add("Macska");
            Console.WriteLine(list.Count);

            list.Remove("Valami");
            Console.WriteLine(list.Count);

            List<string> strings = new List<string>();
            strings.Add("Kacsa");
            strings.Add("Baba");

            list.AddRange(strings);
            Console.WriteLine(list.Count);

            list.RemoveAt(list.Count - 1);
            list.RemoveAt(list.Count - 1);
            Console.WriteLine(list.Count);

            list.Sort();

            for(int i = 0; i < list.Count; i++)
            {
                string s = list[i];
                Console.WriteLine(list[i]);
            }

            foreach(string s in list)
            {
                Console.WriteLine(s);
            }

            list.Clear();

            EFuzetTipus tipus = EFuzetTipus.Kockas;
        }

        static void Rossz()
        {
            throw new Exception();
        }
        static void Rossz1()
        {
            throw new Exception("A Rossz1 metodust nem szabad meghivni!");
        }
        static void Rossz2(int x)
        {
            if (x == 1)
            {
                throw new ArgumentException("...");
            }
            else if (x == 2)
            {
                throw new ArgumentOutOfRangeException("...");
            }
            throw new InvalidOperationException("...");
        }
        static void Rossz3()
        {
            throw new RosszMethodException();
        }
    }
}
