namespace Hunting
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Hunter hunter = ReadHunter("vadasz_input.txt", "Bela", "1977");

            Console.WriteLine(hunter.MaleLions());
            Console.WriteLine(hunter.SameTusks());
            (bool l, double r, Trophy t) = hunter.MaxHorn();
            Console.WriteLine(r);
        }

        public static Hunter ReadHunter(string path, string name, string hunterYear)
        {
            Hunter hunter = new(name, hunterYear);

            foreach (string line in File.ReadLines(path)) {
                string[] data = line.Split(new char[] { ' ', '\t', '\r', '\n' },
                    StringSplitOptions.RemoveEmptyEntries);
                string place = data[0];
                string year = data[1];
                string species = data[2];
                double weight = double.Parse(data[3]);
                Gender gender = data[4] == "female" ? Gender.Female : Gender.Male;

                Animal animal = null;
                switch (species)
                {
                    case "lion":
                        animal = new Lion(weight, gender);
                        break;
                    case "elephant":
                        double left = double.Parse(data[5]);
                        double right = double.Parse(data[6]);
                        animal = new Elephant(weight, gender, left, right);
                        break;
                    case "rhino":
                        double horn = double.Parse(data[5]);
                        animal = new Rhino(weight, gender, horn);
                        break;
                }
                hunter.Shot(place, year, animal);
            }

            return hunter;
        }
    }

}
