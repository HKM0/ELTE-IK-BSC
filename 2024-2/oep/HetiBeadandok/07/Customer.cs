namespace HF7
{
    public class Customer
    {
        private string pin;
        private int withdraw;
        private List<Account> accounts;

        public Customer(string pin, int withdraw)
        {
            this.pin = pin;
            this.withdraw = withdraw;
            this.accounts = new List<Account>();
        }

        public void Withdrawal(ATM atm)
        {
            atm.Process(this);
        }

        public Card ProvidesCard()
        {
            if (accounts.Count > 0) 
            {
                Account firstAccount = accounts[0]; 
                if (firstAccount.cards.Count > 0) 
                {
                    return firstAccount.cards[0]; 
                }
            }
            return null; 
        }

        public string ProvidesPIN()
        {
            return pin;
        }

        public int RequestMoney()
        {
            return withdraw;
        }

        public void AddAccount(Account a)
        {
            accounts.Add(a);
        }
    }
}
