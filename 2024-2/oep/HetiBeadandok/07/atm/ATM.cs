namespace HF7
{
    public class ATM
    {
        public string site { get; private set; }
        private Center center;

        public ATM(string site, Center center)
        {
            this.site = site;
            this.center = center;
        }

        public void Process(Customer c)
        {
            Card card = c.ProvidesCard();
            if (card != null && card.CheckPIN(c.ProvidesPIN()))
            {
                int requestedAmount = c.RequestMoney();
                int currentBalance = center.GetBalance(card.cNum);

                if (currentBalance != -1 && currentBalance >= requestedAmount)
                {
                    center.Transaction(card.cNum, -requestedAmount);
                }
            }
        }
    }
}
