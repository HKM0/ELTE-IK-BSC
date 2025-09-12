namespace HF4
{
    public struct Element
    {
        public int pr;
        public string data;

        public Element()
        {
            pr = 0;
            data = "";
        }

        public Element(int pr, string data)
        {
            this.pr = pr;
            this.data = data;
        }
    }


    public class PrQueue
    {
        private List<Element> seq;
    
        public PrQueue()
        {
            seq = new List<Element>();
        }
    
        public void SetEmpty()
        {
            seq.Clear();
        }
    
        public bool isEmpty()
        {
            return seq.Count == 0;
        }
    
        public void Add(Element e)
        {
            seq.Add(e);
        }
    
        public Element GetMax()
        {
            if (isEmpty())
                throw new InvalidOperationException("ures sor (getMax)");
            int maxInd = MaxSelect();
            return seq[maxInd];
        }
    /*
        public Element RemMax()
        {
            if (isEmpty())
                throw new InvalidOperationException("ures sor (remMax)");
            int maxInd = MaxSelect();
            Element e = seq[maxInd];
            seq[maxInd] = seq[seq.Count - 1];
            seq.RemoveAt(seq.Count - 1);
            return e;
        }
    */
        public Element RemMax()
        {
            if (isEmpty())
                throw new InvalidOperationException("ures sor (remMax)");
            int maxInd = MaxSelect();
            Element e = seq[maxInd];
            seq.RemoveAt(maxInd); 
            return e;
        }
    
        private int MaxSelect()
        {
            if (isEmpty())
                throw new InvalidOperationException("ures sor (maxSelect)");
            int maxInd = 0;
            for (int i = 1; i < seq.Count; i++)
            {
                if (seq[i].pr > seq[maxInd].pr)
                {
                    maxInd = i;
                }
            }
            return maxInd;
        }
    }


    internal class Program
    {
        static void Main(string[] args)
        {
            string[]? input;
            input = Console.ReadLine()?.Split();
            PrQueue testQ = new PrQueue();
            switch (input[0])
            {
                case "Hozzáad":
                    Console.WriteLine("A sor üres:");
                    Console.WriteLine(testQ.isEmpty());
                    Console.WriteLine("Prioritás Adat bemenet:");
                    input = Console.ReadLine()?.Split();
                    int pr1 = int.Parse(input[0]);
                    Element toAdd1;
                    toAdd1.pr = pr1;
                    toAdd1.data = input[1];
                    testQ.Add(toAdd1);
                    Console.WriteLine("A sor nem üres:");
                    Console.WriteLine(!testQ.isEmpty());
                    break;
                case "Üres":
                    Console.WriteLine("A sor üres:");
                    Console.WriteLine(testQ.isEmpty());
                    try
                    {
                        testQ.GetMax();
                    }
                    catch
                    {
                        Console.WriteLine("Hiba - GetMax");
                    }
                    try
                    {
                        testQ.RemMax();
                    }
                    catch
                    {
                        Console.WriteLine("Hiba - RemMax");
                    }
                    break;
                case "Kiürítés":
                    Console.WriteLine("A sor üres:");
                    Console.WriteLine(testQ.isEmpty());
                    Console.WriteLine("Prioritás Adat bemenet:");
                    input = Console.ReadLine()?.Split();
                    int pr2 = int.Parse(input[0]);
                    Element toAdd2;
                    toAdd2.pr = pr2;
                    toAdd2.data = input[1];
                    testQ.Add(toAdd2);
                    Console.WriteLine("A sor nem üres:");
                    Console.WriteLine(!testQ.isEmpty());
                    Console.WriteLine("Kiürítés...");
                    testQ.SetEmpty();
                    Console.WriteLine("Újra hozzáadás...");
                    testQ.Add(toAdd2);
                    Element e = testQ.RemMax();
                    Console.WriteLine(e.data);
                    Console.WriteLine("A sor üres:");
                    Console.WriteLine(testQ.isEmpty());
                    try
                    {
                        testQ.GetMax();
                    }
                    catch
                    {
                        Console.WriteLine("Hiba - GetMax");
                    }
                    try 
                    { 
                        testQ.RemMax();
                    }
                    catch
                    {
                        Console.WriteLine("Hiba - RemMax");
                    }
                    break;
                case "Maximumkiválasztás":
                    Console.WriteLine("Elemek hozzáadása...");
                    Console.WriteLine("Prioritás Adat bemenet:");
                    input = Console.ReadLine()?.Split();
                    int pr3 = int.Parse(input[0]);
                    Element toAdd3;
                    toAdd3.pr = pr3;
                    toAdd3.data = input[1];
                    Console.WriteLine("Prioritás Adat bemenet:");
                    input = Console.ReadLine()?.Split();
                    pr3 = int.Parse(input[0]);
                    Element toAdd4;
                    toAdd4.pr = pr3;
                    toAdd4.data = input[1];
                    Console.WriteLine("Prioritás Adat bemenet:");
                    input = Console.ReadLine()?.Split();
                    pr3 = int.Parse(input[0]);
                    Element toAdd5;
                    toAdd5.pr = pr3;
                    toAdd5.data = input[1];
                    testQ.Add(toAdd3);
                    testQ.Add(toAdd4);
                    testQ.Add(toAdd5);
                    Console.WriteLine("Max lekérdezése:");
                    Element toGet = testQ.GetMax();
                    Console.WriteLine(toGet.data);
                    Console.WriteLine("Max eltávolítása:");
                    toGet = testQ.RemMax();
                    Console.WriteLine(toGet.data);
                    Console.WriteLine("Max lekérdezése:"); 
                    toGet = testQ.GetMax();
                    Console.WriteLine(toGet.data);
                    break;
            }
        }
    }
}
