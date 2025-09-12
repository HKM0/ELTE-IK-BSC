using System;
using System.Linq;

namespace hazi6
{
    internal class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("nincs eleresi utvonal!");
                return;
            }

            string fajl = args[0];
            try
            {
                int bevetel = 0;

                foreach (var line in File.ReadLines(fajl))
                {
                    var adat = line.Split(' ');
                    if (adat.Length < 2) continue;

                    string customerName = adat[0];

                    int sum = 0;
                    for (int i = 2; i < adat.Length; i += 2)
                    {
                        sum += Int32.Parse(adat[i]);
                    }

                    bevetel += sum;
                }

                Console.WriteLine(bevetel);
            }
            catch (Exception)
            {
                Console.WriteLine("hiba van!");
            }
        }
    }
}