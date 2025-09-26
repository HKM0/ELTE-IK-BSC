namespace KonyvtarBeadando

{
    /*-------------------------------------*/
    /*---------Ritkasag interface----------*/
    /*-------------------------------------*/
    public interface Ritkasag
    {
        int GetFactor(Termeszettudomanyi t);
        int GetFactor(Szepirodalmi sz);
        int GetFactor(Ifjusagi i);

    }

    /*-------------------------------------*/
    /*------------------Sok----------------*/
    /*-------------------------------------*/
    public class Sok : Ritkasag
    {
        private static readonly Sok _instance = new Sok();
        private Sok(){}
        public static Sok Instance
        {
            get { return _instance; }
        }
        public int GetFactor(Termeszettudomanyi t)
        {
            return 20;
        }
        public int GetFactor(Szepirodalmi sz)
        {
            return 10;
        }
        public int GetFactor(Ifjusagi i)
        {
            return 5;
        }
    }

    /*-------------------------------------*/
    /*-----------------Keves---------------*/
    /*-------------------------------------*/
    public class Keves : Ritkasag
    {
        private static readonly Keves _instance = new Keves();
        private Keves(){}
        public static Keves Instance
        {
            get { return _instance; }
        }
        public int GetFactor(Termeszettudomanyi t)
        {
            return 60;
        }
        public int GetFactor(Szepirodalmi sz)
        {
            return 30;
        }
        public int GetFactor(Ifjusagi i)
        {
            return 10;
        }
    }

    /*-------------------------------------*/
    /*------------------Ritka--------------*/
    /*-------------------------------------*/

    public class Ritka : Ritkasag
    {
        private static readonly Ritka _instance = new Ritka();
        private Ritka(){}
        public static Ritka Instance
        {
            get { return _instance; }
        }
        public int GetFactor(Termeszettudomanyi t)
        {
            return 100;
        }
        public int GetFactor(Szepirodalmi sz)
        {
            return 50;
        }
        public int GetFactor(Ifjusagi i)
        {
            return 30;
        }
    }
}
