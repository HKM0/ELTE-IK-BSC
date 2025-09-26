using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Purchase
{
    internal class Departement
    {
        public List<Product> Stocks { get; }

        public Departement(List<Product> stocks)
        {
            Stocks = stocks;
        }
    }
}
