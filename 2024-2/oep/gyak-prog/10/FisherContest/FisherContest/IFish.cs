//Author:   Gregorics Tibor
//Date:     2023.03.23.
//Title:    FisherContest

namespace Fisher_Contest
{
    public interface IFish
    {
        int Multiplier();
    }

    /*
    abstract public class Fish
    {
        public abstract int Point();
        public virtual bool IsBream() { return false; }
        public virtual bool IsCarp()  { return false; }
        public virtual bool IsCatfish() { return false; }
    }
    */

    public class Bream : IFish
    {
        private static Bream instance;
        private Bream(){ }
        public static Bream Instance()
        {
            if (null==instance) instance = new Bream();
            return instance;
        }
        public int Multiplier() {return 1;}
    }

    public class Carp : IFish
    {
        private static Carp instance;
        private Carp() { }
        public static Carp Instance()
        {
            if (null == instance) instance = new Carp();
            return instance;
        }
        public int Multiplier() { return 2; }
    }

    public class Catfish : IFish
    {
        private static Catfish instance;
        private Catfish() { }
        public static Catfish Instance()
        {
            if (null == instance) instance = new Catfish();
            return instance;
        }
        public int Multiplier() { return 3; }
    }
}