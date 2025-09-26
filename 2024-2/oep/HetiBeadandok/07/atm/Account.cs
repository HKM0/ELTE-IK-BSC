using System.Collections.Generic;

namespace HF7
{
    public class Account
    {
        public string accNum { get; private set; }
        private int balance;
        public List<Card> cards { get; private set; }

        public Account(string cNum)
        {
            this.accNum = cNum;
            this.balance = 0;
            this.cards = new List<Card>();
        }

        public int GetBalance()
        {
            return balance;
        }

        public void Change(int a)
        {
            balance += a;
        }
    }
}
