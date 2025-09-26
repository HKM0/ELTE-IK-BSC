namespace Map
{
    class Menu
    {
        private readonly Map map = new();
        public void Run()
        {
            int v;
            do
            {
                v = GetMenuPoint();
                try
                {
                    switch (v)
                    {
                        case 1:
                            map.SetEmpty();
                            break;
                        case 2:
                            Console.WriteLine($"number of elements: {map.Count()}");
                            break;
                        case 3:
                            Console.Write("key: ");
                            int key = int.Parse(Console.ReadLine()!);
                            Console.Write("data: ");
                            string data = Console.ReadLine()!;
                            map.Insert(new Item(key, data));
                            break;
                        case 4:
                            Console.Write("key: ");
                            key = int.Parse(Console.ReadLine()!);
                            map.Remove(key);
                            break;
                        case 5:
                            Console.Write("key: ");
                            key = int.Parse(Console.ReadLine()!);
                            if (map.In(key)) Console.WriteLine($"map contains an element with the key {key}");
                            else Console.WriteLine($"map does not contain an element with the key {key}");
                            break;
                        case 6:
                            Console.Write("key: ");
                            key = int.Parse(Console.ReadLine()!);
                            Console.WriteLine($"date of the element with the key {key} is {map[key]}");
                            break;
                        default:
                            Console.WriteLine("\nViszontlatasra!"); 
                            break;
                    }
                }
                catch (Map.NonExistingKeyException ex)
                {
                    Console.WriteLine($"No element with the key {ex.key}");
                }
                catch (Map.ExistingKeyException ex)
                {
                    Console.WriteLine($"The key {ex.key} has already been in the map");
                }
                Console.WriteLine(map.ToString());
            } while (v != 0);
        }
        private static int GetMenuPoint()
        {
            int v;
            do
            {
                Console.WriteLine("\n********************************");
                Console.WriteLine("0. Kilepes");
                Console.WriteLine("1. Kiürít");
                Console.WriteLine("2. Elemek száma");
                Console.WriteLine("3. Beszúr");
                Console.WriteLine("4. Töröl");
                Console.WriteLine("5. Benne van-e");
                Console.WriteLine("6. Olvas");
                Console.WriteLine("****************************************");

                try
                {
                    v = int.Parse(Console.ReadLine()!);
                }
                catch (System.FormatException) { v = -1; }
            } while(v<0 || v>6);
            return v;
        }
    }
}

