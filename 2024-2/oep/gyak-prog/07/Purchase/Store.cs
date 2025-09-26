using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Purchase
{
    internal class Store
    {
        public Departement Food { get; }
        public Departement Utility { get; }

        public Store(List<Product> foodStocks, List<Product> utilityStocks)
        {
            Food = new Departement(foodStocks);
            Utility = new Departement(utilityStocks);
        }
    }
}
