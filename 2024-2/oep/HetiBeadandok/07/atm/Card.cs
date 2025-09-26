namespace HF7
{
    public class Card
    {
        public string cNum { get; private set; }
        private string pin;

        public Card(string cNum, string pin)
        {
            this.cNum = cNum;
            this.pin = pin;
        }

        public bool CheckPIN(string p)
        {
            return this.pin == p;
        }

        public void SetPIN(string p)
        {
            this.pin = p;
        }
    }
}
