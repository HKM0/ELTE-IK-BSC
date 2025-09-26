namespace ParlamentFeladat
{
    internal class Program
    {
        static void Main(string[] args)
        {
            StreamReader sr = new("input.txt");

            string? line;
            line = sr.ReadLine();

            string[] data = line.Split(new char[] {' ', '\t'}, StringSplitOptions.RemoveEmptyEntries);

            List<Képviselő> ks = new();

            for(int i = 0; i < data.Length; i += 2)
            {
                ks.Add(new Képviselő(data[i] + " " + data[i + 1]));
            }

            Parlament p = new(ks);

            while((line = sr.ReadLine()) != null)
            {
                data = line.Split(new char[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);
                Törvényjavaslat t = null;
                switch (data[0])
                {
                    case "Normal":
                        t = new Normál(data[1], data[2]);
                        break;
                    case "Sarkalatos":
                        t = new Sarkalatos(data[1], data[2]);
                        break;
                    case "Alkotmanyos":
                        t = new Alkotmányos(data[1], data[2]);
                        break;
                    default:
                        throw new Exception();
                }
                p.Benyújt(t);

                for (int i = 3; i < data.Length; i++)
                {
                    switch (data[i])
                    {
                        case "igen":
                            ks[i - 3].Szavaz(true, t.Azon);
                            break;
                        case "nem":
                            ks[i - 3].Szavaz(false, t.Azon);
                            break;
                    }
                }
            }

            foreach(string azon in p.Érvényesek())
            {
                Console.WriteLine(azon);
            }
        }
    }
}