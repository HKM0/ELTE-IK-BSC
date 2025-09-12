namespace Base
{
    internal class Dispenser
    {
        private double max;
        private double dose;
        private double act;

        public Dispenser(double a, double b)
        {
            if (!(a > 0 && b > 0)) {
                throw new Exception("ertek hiba");
            }
            max = a;
            dose = b;
            act = 0.0;
        }

        public void Push()
        {
            if (act - dose >= 0)
            {
                act -= dose;
            }
            else {
                act = 0.0;
            }
            //teszteleshez
            //Console.Error.WriteLine(act);
        }

        public void Fill()
        {
            act = max;
        }

        public bool IsEmpty()
        {
            return act == 0.0;
        }
    }
}
