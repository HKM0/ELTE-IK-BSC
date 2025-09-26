namespace Purchase
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Customer customer = ReadCustomer("customer1.txt");

            Store store = new Store(
                ReadStocks("foods.txt"),
                ReadStocks("technical.txt")
            );

            customer.Purchase(store);

            customer.PrintCart();
        }

        public static Customer ReadCustomer(string file)
        {
            string content = File.ReadAllText(file);
            string[] data = content.Split(new char[] { ' ', '\n', '\r' },
                StringSplitOptions.RemoveEmptyEntries);
            return new Customer(new List<string>(data));
        }

        public static List<Product> ReadStocks(string file)
        {
            string[] lines = File.ReadAllLines(file);

            List<Product> products = new List<Product>();
            foreach (string line in lines)
            {
                string[] data = line.Split();
                products.Add(
                    new Product(data[0], int.Parse(data[1]))
                );
            }
            return products;
        }
    }
}
