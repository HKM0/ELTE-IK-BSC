using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Hunting
{
    public class Hunter
    {
        public string Name { get; }
        public string Year { get; }
        private List<Trophy> Trophies { get; }

        public Hunter(string name, string year)
        {
            Name = name;
            Year = year;
            Trophies = new List<Trophy>();
        }

        public void Shot(string place, string date, Animal animal)
        {
            Trophies.Add(new Trophy(place, date, animal));
        }

        public int MaleLions()
        {
            int count = 0;
            foreach (var item in Trophies)
            {
                if(item.Animal is Lion && item.Animal.Gender == Gender.Male)
                {
                    count++;
                }
            }
            return count;
        }
        public int MaleLionsLinq()
        {
            int count = Trophies.Count(x => x.Animal is Lion && x.Animal.Gender == Gender.Male);
            return count;
        }
        public (bool, double, Trophy) MaxHorn()
        {
            bool l = false;
            double rate = 0;
            Trophy trophy = null;

            foreach (var item in Trophies)
            {
                if(item.Animal is Rhino rhino)
                {
                    if (!l)
                    {
                        l = true;
                        rate = rhino.Horn / rhino.Weight;
                        trophy = item;
                    }
                    else
                    {
                        if(rate > rhino.Horn / rhino.Weight)
                        {
                            rate = rhino.Horn / rhino.Weight;
                            trophy = item;
                        }
                    }
                }
            }
            return (l, rate, trophy);
        }
        public (bool, double, Trophy) MaxHornLinq()
        {
            bool l = Trophies.Any(item => item.Animal is Rhino);
            if (!l)
            {
                return (false, 0, null);
            }
            Trophy max = Trophies.Where(item => item.Animal is Rhino)
                    .MaxBy(item => ((Rhino)item.Animal).Horn / ((Rhino)item.Animal).Weight);
            double rate = ((Rhino)max.Animal).Horn / ((Rhino)max.Animal).Weight;
            return (true, rate, max);
        }
        public bool SameTusks()
        {
            foreach (var item in Trophies)
            {
                /*
                if(item.Animal is Elephant)
                {
                    Elephant elephant = (Elephant)item.Animal;
                    if(elephant.Left == elephant.Right)
                    {
                        return true;
                    }
                }
                */
                if (item.Animal is Elephant elephant)
                {
                    if (elephant.Left == elephant.Right)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
        public bool SameTusksLinq()
        {
            bool exists = Trophies.Any(item => item.Animal is Elephant elephant
                                            && elephant.Left == elephant.Right);
            return exists;
        }
    }
}
