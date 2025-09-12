namespace HF7
{
    public class Center
    {
        private List<Bank> banks;

        public Center(List<Bank> banks)
        {
            this.banks = banks;
        }

        public int GetBalance(string cNum)
        {
            bool found;
            Bank bank;
            (found, bank) = FindBank(cNum);
            if (found && bank != null)
            {
                return bank.GetBalance(cNum);
            }
            else
            {
                return -1;
            }
        }

        public void Transaction(string cNum, int amount)
        {
            bool found;
            Bank bank;
            (found, bank) = FindBank(cNum);
            if (found && bank != null)
            {
                bank.Transaction(cNum, amount);
            }
        }


        private (bool, Bank) FindBank(string cNum)
        {
            foreach (var b in banks)
            {
                if (b.CheckAccount(cNum))
                {
                    return (true, b);
                }
            }
            return (false, null);
        }
    }
}
