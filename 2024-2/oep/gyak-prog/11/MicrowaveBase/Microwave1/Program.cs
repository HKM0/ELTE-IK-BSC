using System;

namespace Microwave
{
    class Program
    {
        static void Main()
        {
            MicroWave micro = new();Console.WriteLine(micro);

            micro.door.Open();      Console.WriteLine(micro);
            micro.door.Close();     Console.WriteLine(micro);
            micro.button.Press();   Console.WriteLine(micro);
            micro.button.Press();   Console.WriteLine(micro);
            micro.door.Open();      Console.WriteLine(micro);
        }
    }
}
