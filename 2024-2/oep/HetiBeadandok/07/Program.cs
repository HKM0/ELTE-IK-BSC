using System.Threading.Channels;

namespace HF7
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Unittest to run");
            string choice = Console.ReadLine();
            switch (choice)
            {
                case "Center":
                    TestCenter();
                    break;
                case "ATM":
                    TestATM();
                    break;
                case "Bank":
                    TestBank();
                    break;
                case "Customer":
                    TestCustomer();
                    break;
                case "Card":
                    TestCard();
                    break;
                case "Account":
                    TestAccount();
                    break;
            }
        }
        public static void TestCenter()
        {
            Console.WriteLine("Unittesting Center class");
            List<Bank> testBankList = new List<Bank>();
            Bank testBank = new Bank();
            Customer testCustomer = new Customer("1234", 10);
            testBank.OpenAccount("12345", testCustomer);
            testBankList.Add(testBank);
            Console.WriteLine("Testing - Constructor");
            Center? tested = null;
            try
            {
                tested = new Center(testBankList);
            }
            catch
            {
                Console.WriteLine("Result - Constructor - Unsuccessful");
            }
            Console.WriteLine("Testing - GetBalance");
            try
            {
                Console.WriteLine("Input - Account number");
                string input = Console.ReadLine();
                int correctBalance = -1;
                foreach (Bank bank in testBankList)
                {
                    if (bank.CheckAccount(input))
                        correctBalance = bank.GetBalance(input);
                    break;
                }
                int balance = tested.GetBalance(input);
                if (balance == correctBalance && balance != -1)
                    Console.WriteLine(balance);
                else if (balance == -1)
                    Console.WriteLine("No account found");
            }
            catch
            {
                Console.WriteLine("Result - GetBalance - Unsuccessful");
            }
            Console.WriteLine("Testing - Transaction");
            try
            {
                Console.WriteLine("Input - Account number");
                string input = Console.ReadLine();
                Console.WriteLine("Input - Change amount");
                int testAmount = int.Parse(Console.ReadLine());
                int previousAmount = tested.GetBalance(input);
                tested.Transaction(input, testAmount);
                int lastAmount = tested.GetBalance(input);
                Console.WriteLine(lastAmount);
            }
            catch
            {
                Console.WriteLine("Result - Transaction - Unsuccessful");
            }
        }
        public static void TestATM()
        {
            Console.WriteLine("Unittesting ATM class");
            List<Bank> testBanks = new List<Bank>();
            Bank testBank = new Bank();
            testBanks.Add(testBank);
            Center testCenter = new Center(testBanks);
            Console.WriteLine("Testing - Constructor");
            ATM tested;
            try
            {
                tested = new ATM("Miami", testCenter);
            }
            catch
            {
                Console.WriteLine("Result - Constructor - Unsuccessful");
            }
            tested = new ATM("Miami", testCenter);
            Console.WriteLine("Input - PIN of customer");
            string PIN = Console.ReadLine();
            Console.WriteLine("Input - Amount customer withdraws");
            int withdraw = int.Parse(Console.ReadLine());
            Customer testCustomer = new Customer(PIN, withdraw);
            testBank.OpenAccount("12345", testCustomer);
            Console.WriteLine("Input - Base amount on bank account");
            int baseAmount = int.Parse(Console.ReadLine());
            testBank.Transaction("12345", baseAmount);
            testBank.ProvidesCard("12345");
            Card customerCard = testCustomer.ProvidesCard();
            customerCard.SetPIN(PIN);
            Console.WriteLine("Testing - Process");
            try
            {
                tested.Process(testCustomer);
                if(baseAmount >= withdraw)
                {
                    if (testBank.GetBalance("12345") == baseAmount - withdraw)
                        Console.WriteLine("Result - Process - Successful");
                    else
                        Console.WriteLine("Result - Process - Unsuccessful - Balance unchanged");
                }
                else
                {
                    if (testBank.GetBalance("12345") == baseAmount)
                        Console.WriteLine("Result - Process - Successful");
                    else
                        Console.WriteLine("Result - Process - Unsuccessful - Balance changed");
                }
            }
            catch
            {
                Console.WriteLine("Result - Process - Unsuccessful - With exception");
            }
        }
        public static void TestCustomer()
        {
            Console.WriteLine("Unittesting Customer class");
            List<Bank> testBanks = new List<Bank>();
            Bank testBank = new Bank();
            testBanks.Add(testBank);
            Center testCenter = new Center(testBanks);
            ATM testATM = new ATM("Miami", testCenter);
            Customer tested;
            string PIN;
            int withdraw;
            Console.WriteLine("Testing - Constructor");
            try
            {
                Console.WriteLine("Input - PIN of customer");
                PIN = Console.ReadLine();
                Console.WriteLine("Input - Amount customer withdraws");
                withdraw = int.Parse(Console.ReadLine());
                tested = new Customer(PIN, withdraw);
            }
            catch
            {
                Console.WriteLine("Result - Constructor - Unsuccessful");
            }
            Console.WriteLine("Testing - Withdrawal");
            Console.WriteLine("Input - PIN of customer");
            PIN = Console.ReadLine();
            Console.WriteLine("Input - Amount customer withdraws");
            withdraw = int.Parse(Console.ReadLine());
            tested = new Customer(PIN, withdraw);
            try
            {
                testBank.OpenAccount("12345", tested);
                Console.WriteLine("Input - Base amount on bank account");
                int baseAmount = int.Parse(Console.ReadLine());
                testBank.Transaction("12345", baseAmount);
                testBank.ProvidesCard("12345");
                tested.Withdrawal(testATM);
                if (baseAmount >= withdraw)
                {
                    if (testBank.GetBalance("12345") == baseAmount - withdraw)
                        Console.WriteLine("Result - Withdrawal - Successful");
                    else
                        Console.WriteLine("Result - Withdrawal - Unsuccessful - Balance unchanged");
                }
                else
                {
                    if (testBank.GetBalance("12345") == baseAmount)
                        Console.WriteLine("Result - Withdrawal - Successful");
                    else
                        Console.WriteLine("Result - Withdrawal - Unsuccessful - Balance changed");
                }
            }
            catch
            {
                Console.WriteLine("Result - Withdrawal - Unsuccessful");
            }
            Console.WriteLine("Tesing - ProvidesPIN");
            try
            {
                Console.WriteLine(tested.ProvidesPIN());
            }
            catch
            {
                Console.WriteLine("Result - ProvidesPIN - Unsuccessful");
            }
            Console.WriteLine("Testing - ProvidesCard");
            try
            {
                Card testCard = tested.ProvidesCard();
                Console.WriteLine("Card provided");
            }
            catch
            {
                Console.WriteLine("Result - ProvidesCard - Unsuccessful");
            }
            Console.WriteLine("Testing - RequestsMoney");
            try
            {
                Console.WriteLine(tested.RequestMoney());
            }
            catch
            {
                Console.WriteLine("Result - ProvidesPIN - Unsuccessful");
            }
            Console.WriteLine("Testing - AddAccount");
            try
            {
                tested.AddAccount(new Account("23456"));
                Console.WriteLine("Account added");
            }
            catch
            {
                Console.WriteLine("Result - AddAccount - Unsuccessful");
            }
        }
        public static void TestCard()
        {
            Console.WriteLine("Unittesting Card class");
            Card tested;
            string cNum, PIN;
            Console.WriteLine("Testing - Constructor");
            try
            {
                Console.WriteLine("Input - Card number");
                cNum = Console.ReadLine();
                Console.WriteLine("Input - PIN number");
                PIN = Console.ReadLine();
                tested = new Card(cNum, PIN);
                Console.WriteLine(tested.cNum);
            }
            catch
            { 
                Console.WriteLine("Result - Constructor - Unsuccessful");
            }
            Console.WriteLine();
            Console.WriteLine("Input - Card number");
            cNum = Console.ReadLine();
            Console.WriteLine("Input - PIN number");
            PIN = Console.ReadLine();
            tested = new Card(cNum, PIN);
            Console.WriteLine("Testing - CheckPIN");
            try
            {
                Console.WriteLine("Input - PIN to check");
                string testPIN = Console.ReadLine();
                Console.WriteLine(tested.CheckPIN(testPIN));
            }
            catch {
                Console.WriteLine("Result - CheckPIN - Unsuccessful");
            }
            Console.WriteLine("Testing - SetPIN");
            try
            {
                Console.WriteLine("Input - PIN to set");
                string testPIN = Console.ReadLine();
                tested.SetPIN(testPIN);
                Console.WriteLine(tested.CheckPIN(testPIN));
            }
            catch
            {
                Console.WriteLine("Result - SetPIN - Unsuccessful");
            }
        }
        public static void TestAccount()
        {
            Console.WriteLine("Unittesting Account class");
            Account tested;
            string testCNum;
            Console.WriteLine("Testing - Constructor");
            try
            {
                Console.WriteLine("Input - Account number");
                testCNum = Console.ReadLine();
                tested = new Account(testCNum);
                Console.WriteLine(tested.accNum);
                Console.WriteLine(tested.GetBalance());
                Console.WriteLine(tested.cards.Count);
            }
            catch
            {
                Console.WriteLine("Result - Constructor - Unsuccessful");
            }
            Console.WriteLine("Input - Account number");
            testCNum = Console.ReadLine();
            tested = new Account(testCNum);
            Console.WriteLine("Testing - GetBalance and Change");
            try
            {
                Console.WriteLine("Input - Amount to change");
                int AmountToChange = int.Parse(Console.ReadLine());
                Console.WriteLine(tested.GetBalance());
                tested.Change(AmountToChange);
                Console.WriteLine(tested.GetBalance());
            }
            catch
            {
                Console.WriteLine("Result - GetBalance - Unsuccessful");
            }
        }
        public static void TestBank()
        {
            Console.WriteLine("Unittesting Bank class");
            Bank tested;
            Console.WriteLine("Testing - Constructor");
            try
            {
                tested = new Bank();
            }
            catch
            {
                Console.WriteLine("Result - Constructor - Unsuccessful");
            }
            tested = new Bank();
            Customer testCustomer;
            Console.WriteLine("Testing - OpenAccount");
            try
            {
                testCustomer = new Customer("1234", 10);
                Console.WriteLine("Input - Account to create");
                string accountToCreate = Console.ReadLine();
                Console.WriteLine("Input - Account to check");
                string accountToCheck = Console.ReadLine();
                tested.OpenAccount(accountToCreate, testCustomer);
                Console.WriteLine(tested.GetBalance(accountToCheck));
            }
            catch
            {
                Console.WriteLine("Result - OpenAccount - Unsuccessful");
            }
            testCustomer = new Customer("1234", 10);
            Console.WriteLine("Testing - ProvideCard");
            try
            {
                tested.OpenAccount("12345", testCustomer);
                tested.ProvidesCard("12345");
                Console.WriteLine("ProvideCard run");
            }
            catch
            {
                Console.WriteLine("Result - ProvideCard - Unsuccessful");
            }
            Console.WriteLine("Testing - GetBalance and Transaction");
            try
            {
                Console.WriteLine("Input - Account to create");
                string accountToCreate = Console.ReadLine();
                Console.WriteLine("Input - Account to check");
                string accountToCheck = Console.ReadLine();
                tested.OpenAccount(accountToCreate, testCustomer);
                Console.WriteLine(tested.GetBalance(accountToCheck));
                Console.WriteLine("Input - Amount for transaction");
                int transactionAmount = int.Parse(Console.ReadLine());
                tested.Transaction(accountToCreate, transactionAmount);
                Console.WriteLine(tested.GetBalance(accountToCheck));
            }
            catch
            {
                Console.WriteLine("Result - GetBalance and Transaction - Unsuccessful");
            }
            Console.WriteLine("Testing - CheckAccount");
            try
            {
                Console.WriteLine("Input - Account to create");
                string accountToCreate = Console.ReadLine();
                Console.WriteLine("Input - Account to check");
                string accountToCheck = Console.ReadLine();
                tested.OpenAccount(accountToCreate, testCustomer);
                Console.WriteLine(tested.CheckAccount(accountToCheck));
            }
            catch 
            {
                Console.WriteLine("Result - GetBalance and Transaction - Unsuccessful");
            }
        }
    }
}
