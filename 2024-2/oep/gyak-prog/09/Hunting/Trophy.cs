using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hunting
{
    public class Trophy
    {
        public string Place { get; }
        public string Date { get; }
        public Animal Animal { get; }

        public Trophy(string place, string date, Animal animal)
        {
            Place = place;
            Date = date;
            Animal = animal;
        }
    }
}
