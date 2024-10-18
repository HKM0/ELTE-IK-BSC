namespace gyak5
{
    internal class Program
    {
        const int MaxN = 100;
        //azért a mainen kívül, hogy globális változóként tudjuk használni másik függvényben is.
        public struct TeruletT
        {
            public string n;
            public int Adb;
            public string[] a;
        }
        public int Z = Int32.Parse(Console.ReadLine());
        static void Main(string[] args)
        {
        Console.WriteLine("Adatok blyet");
        int N;
        TeruletT[] t = new TeruletT[MaxN];
        int osszAdb;
        bool vanKacsa;
        int tKacsa;
        int dbMajomterulet;


            // beolvasas
            //        N = Int32.Parse(Console.ReadLine());
            //        int Z;
            //        string[] tmp = Console.ReadLine().Split('\n');
            //        Z = Int32.Parse(tmp[0]);
            //            for (int i = 0; i <= Z; i++)
            //            {
            //                for (int n = 0; n <= Z; n += 3)
            //                {
            //                    t[i].n = tmp[n];
            //                }
            //                for (int Adb = 1; Adb <= Z; Adb += 3)
            //                {
            //                    t[i].Adb = Int32.Parse(tmp[Adb]);
            //                }
            //
            //                for (int a = 1; a <= Z; a += 3)
            //                {
            //                    t[i].a = tmp[a].Split(' ');
            //                }
            //            }
            int Z = Int32.Parse(Console.ReadLine());
            for (int i = 0; i <= Z; i++) {
                    Console.WriteLine("Kérem a terület nevét: ");
                    t[i].n = Console.ReadLine();
                    Console.WriteLine("Kérem az állatok számát: ");
                    t[i].Adb = Int32.Parse(Console.ReadLine());
                    string[] trp = new string[t[i].Adb];
                    for (int z = 0; z <= t[i].Adb; z++)
                    {
                        Console.WriteLine("Kérem az "+(z+1)+". állatot");
                        trp[z] = Console.ReadLine();
                    }
                    t[i].a = trp;
           
            
            // megoldas




            // kiiras
            static void kiiras(int osszAdb, int dbMajomTer, string tKacsa)
            {
                Console.WriteLine("Az összes állatok száma: "+ osszAdb);
                Console.WriteLine("A majom területek száma: "+ dbMajomTer);
                Console.WriteLine("A Kacsa területe");
            }
            static void kivalasztasKacsa(int N, TeruletT[] t) {
                int index = 0;
                for (int i = 0; i<= t.Length; i++) { 
                    for (int j = 0; j <= t[i].Adb-1; j++) {
                        if (t[i].a[j] == "kacsa")
                            {
                                index = i;
                            }
                       }
                        return t[index].n;
            }

            static void szamolMajomTerulet(int N, TeruletT[] t) {
                int darab = 0;
                for (int i = 0;i < N; i++)
                {
         
                        }






            }
        }
    }
}
