namespace HF7
{
    public class Bank
    {
        private List<Account> accounts;

        public Bank()
        {
            this.accounts = new List<Account>();
        }

        public void OpenAccount(string cNum, Customer c)
        {
            Account newAccount = new Account(cNum);
            this.accounts.Add(newAccount);
            c.AddAccount(newAccount);
        }

        public void ProvidesCard(string cNum)
        {
            bool found;
            Account account;
            (found, account) = FindAccount(cNum);
            if (found && account != null)
            {
                Card newCard = new Card(cNum, "1234");
                account.cards.Add(newCard);
            }
        }

        public int GetBalance(string cNum)
        {
            bool found;
            Account account;
            (found, account) = FindAccount(cNum);
            if (found && account != null)
            {
                return account.GetBalance();
            }
            else
            {
                return -1;
            }
        }

        public void Transaction(string cNum, int amount)
        {
            bool found;
            Account account;
            (found, account) = FindAccount(cNum);
            if (found && account != null)
            {
                account.Change(amount);
            }
        }

        public bool CheckAccount(string cNum)
        {
            return accounts.Any(acc => acc.accNum == cNum);
        }
        private (bool, Account) FindAccount(string cNum)
        {
            foreach (Account account in accounts)
            {
                if (account.accNum == cNum)
                {
                    return (true, account);
                }
            }
            return (false, null);
        }
    }
}

