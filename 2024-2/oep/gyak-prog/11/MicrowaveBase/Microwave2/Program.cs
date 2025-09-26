using System;
using System.Threading;

namespace Microwave
{
    class Program
    {
        static void Main()
        {
            MicroWave micro = new();    Thread.Sleep(500); Console.WriteLine(micro);
            micro.door.Open();          Thread.Sleep(500); Console.WriteLine(micro);
            micro.door.Close();         Thread.Sleep(500); Console.WriteLine(micro);
            micro.button.Press();       Thread.Sleep(500); Console.WriteLine(micro);
            micro.button.Press();       Thread.Sleep(500); Console.WriteLine(micro);
            micro.door.Open();          Thread.Sleep(500); Console.WriteLine(micro);
            micro.Stop();
        }

    }
}
