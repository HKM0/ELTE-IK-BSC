namespace Map
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Map");

            Menu test = new();
            test.Run();

            ItemX<string> itemX = new ItemX<string>(3, "cucc");
            itemX.value = "hello";

            ItemX<int> itemM = new ItemX<int>(3, 5);
            itemM.value = 7;

            Dictionary<int, string> keyValuePairs = new Dictionary<int, string>();
            keyValuePairs.Add(5, "hal");
        }
    }
}