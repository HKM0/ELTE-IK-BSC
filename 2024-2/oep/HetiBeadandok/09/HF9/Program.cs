using System.Threading.Channels;

namespace HF9
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Unittest to run");
            string choice = Console.ReadLine();
            switch (choice)
            {
                case "Wallbreaker":
                    TestWallbreaker();
                    break;
                case "Lasership":
                    TestLasership();
                    break;
                case "Landingship":
                    TestLandingship();
                    break;
                case "Starship":
                    TestStarship();
                    break;
                case "Planet":
                    TestPlanet();
                    break;
                case "Solarsystem":
                    TestSolarsystem();
                    break;
            }
        }
        public static void TestWallbreaker()
        {
            Console.WriteLine("Input - name, shield, armor, guardian");
            string[] input = Console.ReadLine().Split();
            string name = input[0];
            int shield = int.Parse(input[1]);
            int armor = int.Parse(input[2]);
            int guardian = int.Parse(input[3]);
            Wallbreaker tested;
            Console.WriteLine("Constructor");
            tested = new Wallbreaker(name, shield, armor, guardian);
            Console.WriteLine("FireP");
            Console.WriteLine(tested.FireP());
        }
        public static void TestLandingship()
        {
            Console.WriteLine("Input - name, shield, armor, guardian");
            string[] input = Console.ReadLine().Split();
            string name = input[0];
            int shield = int.Parse(input[1]);
            int armor = int.Parse(input[2]);
            int guardian = int.Parse(input[3]);
            Landingship tested;
            Console.WriteLine("Constructor");
            tested = new Landingship(name, shield, armor, guardian);
            Console.WriteLine("FireP");
            Console.WriteLine(tested.FireP());
        }
        public static void TestLasership()
        {
            Console.WriteLine("Input - name, shield, armor, guardian");
            string[] input = Console.ReadLine().Split();
            string name = input[0];
            int shield = int.Parse(input[1]);
            int armor = int.Parse(input[2]);
            int guardian = int.Parse(input[3]);
            Lasership tested;
            Console.WriteLine("Constructor");
            tested = new Lasership(name, shield, armor, guardian);
            Console.WriteLine("FireP");
            Console.WriteLine(tested.FireP());
        }
        public static void TestStarship()
        {
            Console.WriteLine("Input - name, shield, armor, guardian");
            string[] input = Console.ReadLine().Split();
            string name = input[0];
            int shield = int.Parse(input[1]);
            int armor = int.Parse(input[2]);
            int guardian = int.Parse(input[3]);
            Starship tested;
            Console.WriteLine("Constructor");
            tested = new Wallbreaker(name, shield, armor, guardian);
            Console.WriteLine("GetShield");
            Console.WriteLine(tested.GetShield());
            Console.WriteLine("StaysAtPlanet and LeavesPlanet");
            Console.WriteLine("Input - Should it go to a planet?");
            string goToPlanet = Console.ReadLine();
            if (goToPlanet == "Yes")
                try
                {
                    tested.StaysAtPlanet(new Planet("None"));
                    Console.WriteLine("Ship went to a planet");
                    tested.StaysAtPlanet(new Planet("Next"));
                    Console.WriteLine("Ship went to another planet");
                }
                catch
                {
                    Console.WriteLine("There was an error moving planets");
                }
            try {
                tested.LeavesPlanet();
                Console.WriteLine("Ship left the planet");
            }
            catch
            {
                Console.WriteLine("No planet to leave");
            }
        }
        public static void TestPlanet()
        {
            Console.WriteLine("Input - name");
            string input = Console.ReadLine();
            Console.WriteLine("Constructor");
            Planet tested = new Planet(input);
            Console.WriteLine("Defends");
            Starship stay = new Starship("None", 5, 5, 5);
            try
            {
                tested.Defends(stay);
            }
            catch
            {
                Console.WriteLine("Unsuccessful Defends call");
            }
            try
            {
                tested.Defends(stay);
                Console.WriteLine("This ship already defends this planet");
            }
            catch
            {
                
            }
            Console.WriteLine("Leaves");
            try
            {
                tested.Leaves(stay);
            }
            catch
            {
                Console.WriteLine("Unsuccessful Leaves call");
            }
            try
            {
                tested.Leaves(stay);
                Console.WriteLine("This ship doesn't defend this planet");
            }
            catch
            {
                
            }
            ReadShips(tested);
            Console.WriteLine("ShipCount");
            Console.WriteLine(tested.ShipCount());
            Console.WriteLine("ShieldSum");
            Console.WriteLine(tested.ShieldSum());
            (bool I, double max, _) = tested.MaxFireP();
            if (I)
                Console.WriteLine(max);
            else
                Console.WriteLine("No ship defends this planet");
        }
        public static void TestSolarsystem()
        {
            Solarsystem tested;
            Console.WriteLine("Constructor");
            tested = new Solarsystem();
            Console.WriteLine("Input - number of planets");
            int numOfPlanets = int.Parse(Console.ReadLine());
            string planetName;
            Planet toAdd;
            for (int i = 0; i < numOfPlanets; i++)
            {
                Console.WriteLine("Input - name of planet");
                planetName = Console.ReadLine();
                toAdd = new Planet(planetName);
                ReadShips(toAdd);
                tested.planets.Add(toAdd);
            }
            Console.WriteLine("Defenseless");
            List<Planet> defenseless = tested.Defenseless();
            Console.WriteLine("Defenseless planets");
            for (int i = 0; i < defenseless.Count; i++)
                Console.WriteLine(defenseless[i].name);
            Console.WriteLine("MaxFireP");
            (bool I, Starship maxShip) = tested.MaxFireP();
            if (I)
                Console.WriteLine(maxShip.FireP());
            else
                Console.WriteLine("No ship defends this solar system");
        }
        public static void ReadShips(Planet p)
        {
            Console.WriteLine("Input - number of ships");
            int numOfShips = int.Parse(Console.ReadLine());
            string[] input;
            Starship ship;
            for (int i = 0;  i < numOfShips; i++)
            {
                Console.WriteLine("Input - shiptype, name, shield, armor, guardian");
                input = Console.ReadLine().Split();
                if (input[0] == "Wallbreaker")
                    ship = new Wallbreaker(input[1], int.Parse(input[2]), int.Parse(input[3]), int.Parse(input[4]));
                else if (input[0] == "Lasership")
                    ship = new Lasership(input[1], int.Parse(input[2]), int.Parse(input[3]), int.Parse(input[4]));
                else
                    ship = new Landingship(input[1], int.Parse(input[2]), int.Parse(input[3]), int.Parse(input[4]));
                p.Defends(ship);
            }
        }
    }
}
