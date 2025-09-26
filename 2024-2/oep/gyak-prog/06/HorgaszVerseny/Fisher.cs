using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HorgaszVerseny
{
    internal class Fisher
    {
        public Fisher(string name)
        {
            Name = name;
            Catches = new();
        }

        public string Name { get; }

        public List<Fish> Catches { get; }

        // public double PontySuly { get; }

        public double PontySuly()
        {
            double sum = 0;
            foreach (Fish f in Catches)
            {
                if(f.Species == "ponty" && f.Length >= 0.5)
                {
                    sum += f.Weight;
                }
            }
            return sum;
        }
    }

    internal class Fish
    {
        public Fish(string species, string date, double weight, double length)
        {
            Species = species;
            Date = date;
            Weight = weight;
            Length = length;
        }

        public string Species { get; }

        public string Date { get; }

        public double Weight { get; }

        public double Length { get; }
    }
}
