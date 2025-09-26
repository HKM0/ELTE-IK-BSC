using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Purchase
{
    internal class Customer
    {
        private List<Product> cart;
        private List<string> purchaseList;

        public Customer(List<string> purchaseList)
        {
            this.purchaseList = purchaseList;
            cart = new List<Product>();
        }

        public void Purchase(Store store)
        {
            for(int i = 0; i < purchaseList.Count; i++)
            {
                string stuff = purchaseList[i];
                (bool l, Product p) = Search(stuff, store.Food);
                if (l)
                {
                    Buy(p, store.Food);
                    purchaseList.Remove(stuff);
                    i--;
                }
            }
            for (int i = 0; i < purchaseList.Count; i++)
            {
                string stuff = purchaseList[i];
                (bool l, Product p) = MinSearch(stuff, store.Utility);
                if (l)
                {
                    Buy(p, store.Utility);
                    purchaseList.Remove(stuff);
                    i--;
                }
            }
        }

        public static (bool, Product) Search(string name, Departement departement)
        {
            foreach(Product product in departement.Stocks)
            {
                if(product.Name == name)
                {
                    return (true, product);
                }
            }

            return (false, null);
        }

        public static (bool, Product) MinSearch(string name, Departement departement)
        {
            bool l = false;
            Product p = null;

            foreach(Product prod in departement.Stocks)
            {
                if(prod.Name == name)
                {
                    if (l && p.Price > prod.Price)
                    {
                        p = prod;
                    }
                    else if (!l)
                    {
                        p = prod;
                        l = true;
                    }
                }
            }
            return (l, p);
        }

        private void Buy(Product product, Departement departement)
        {
            departement.Stocks.Remove(product);
            cart.Add(product);
        }

        public void PrintCart()
        {
            foreach (Product product in cart)
            {
                Console.WriteLine(product);
            }
        }
    }
}
