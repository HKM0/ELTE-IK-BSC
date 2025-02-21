namespace gyak2
{
    public class RosszMethodException : Exception { }

    public class RosszMasikMehtodException : InvalidOperationException { } // egyedi exception osztály, ami az InvalidOperationException-ből származik
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            try
            {
                Rossz2(1);
            }
            catch (ArgumentException e)
            {
                Console.WriteLine("A francba");
            }
            try
            {
                Rossz3();
            }
            catch (RosszMethodException e)
            {
                Console.WriteLine("hiba");
            }

            String[] cucc = new string[3];
            cucc = cucc.Where((source, index) => index != 0).ToArray(); // a Where metódus egy feltételt ad meg, amit minden elemre alkalmaz, és csak azokat adja vissza, amelyekre a feltétel igaz
           
            // vagy pedig listaként
            List<string> cucc3 = new List<string>();
            cucc3.Add("szia");
            cucc3.Add("uram");
            cucc3.Add("bojler");
            cucc3.Add("elado");
            Console.WriteLine(cucc3.Count);
            cucc3.RemoveAt(cucc3.Count - 1);
            cucc3.RemoveAt(cucc3.Count - 1);
            Console.WriteLine(cucc3.Count);

            //új lista létrehozása
            List<string> lista = new List<string>();
            lista.Add("egy");
            lista.Add("ketto");
            lista.Add("harom");

            //hozzá adom a lista elemeit a cucc3 listához
            cucc3.AddRange(lista);
            Console.WriteLine(cucc3.Count);
            //törlöm a lista utolsó 3 elemét
            cucc3.RemoveAt(cucc3.Count - 1);
            cucc3.RemoveAt(cucc3.Count - 1);
            cucc3.RemoveAt(cucc3.Count - 1);

            // for loopal:
            for (int i = 0; i < cucc3.Count; i++) { 
                string s = cucc3[i];
                Console.WriteLine(cucc3[i]);
            }
            foreach (string s in cucc3)
            {
                Console.WriteLine(s);
            }

            lista.Clear(); // lista törlése
            cucc3.Clear(); // cucc3 törlése



        }
        static void Rossz() {
            throw new Exception("Rossz"); // new kulcsszóval hozunk létre egy új Exception objektumot, és azzal dobunk kivételt.
        }
        static void Rossz1()
        {
            throw new Exception("A Rossz1 metodust nem szabad meghivni.");
        }
        static void Rossz2(int x) // a legtöbb exception az Exception osztályból származik
        {
            throw new ArgumentException("hibas adat");
            throw new ArgumentOutOfRangeException("hibas adat");
            throw new ArgumentNullException("hibas adat");
            throw new InvalidOperationException("hibas adat");
            throw new FormatException("hibas adat");
            throw new DivideByZeroException("hibas adat");
            throw new IndexOutOfRangeException("hibas adat");
            throw new InvalidCastException("hibas adat");
            throw new OverflowException("hibas adat");
            throw new StackOverflowException("hibas adat");
            throw new NotImplementedException("hibas adat");
            throw new NotSupportedException("hibas adat");
            throw new KeyNotFoundException("hibas adat");
            throw new FileNotFoundException("hibas adat");
            throw new DirectoryNotFoundException("hibas adat");
            throw new PathTooLongException("hibas adat");
            throw new IOException("hibas adat");
            throw new UnauthorizedAccessException("hibas adat");
            throw new NotSupportedException("hibas adat");
        }
        static void Rossz3() {
            throw new RosszMethodException();
        }

        static void Rossz4(int x) {
            if (x == 1)
            {
                throw new ArgumentException("hibas bemenet");
            }
            else if (x == 2)
            {
                throw new ArgumentOutOfRangeException("kivulre kerult a listabol.");
            }
            else 
            { 
                throw new Exception("Yipeee");
            }
        }
    }   
}
