//Author:   Gregorics Tibor
//Date:     2023.03.23.
//Title:    FisherContest

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using TextFile;

namespace Fisher_Contest
{
    class Program
    {
        static void Main()
        {
            using StreamReader sr = new("contests.txt");
            Organization org = new();
            string line = sr.ReadLine();
            string[] data = line.Split(new char[] { '\t', ' '}, StringSplitOptions.RemoveEmptyEntries);
            foreach (string s in data)
            {
                org.Join(new Fisher(s));
            }
            while((line = sr.ReadLine()) != null)
            {
                ReadContest(line, org);
            }

            if(org.BestContest(out Contest contest))
            {
                Console.WriteLine(contest.place);
            }
            else
            {
                Console.WriteLine("🤢");
            }
        }
        public static void ReadContest(string name, Organization org)
        {
            using StreamReader csr = new(name);
            string cLine = csr.ReadLine();
            string[] data = cLine.Split(new char[] { '\t', ' ' }, StringSplitOptions.RemoveEmptyEntries);

            string place = data[0];
            DateTime date = DateTime.Parse(data[1]);
            Contest con = org.Organize(place, date);

            cLine = csr.ReadLine();
            data = cLine.Split(new char[] { '\t', ' ' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (string s in data)
            {
                con.SignUp(org.Search(s));
            }

            Dictionary<string, IFish> keyValuePairs = new Dictionary<string, IFish>();
            keyValuePairs.Add("keszeg", Carp.Instance());
            keyValuePairs.Add("ponty", Bream.Instance());
            keyValuePairs.Add("harcsa", Catfish.Instance());

            while ((cLine = csr.ReadLine()) != null)
            {
                data = cLine.Split(new char[] { '\t', ' ' }, StringSplitOptions.RemoveEmptyEntries);

                Fisher f = org.Search(data[0]);
                DateTime cdate = DateTime.Parse(data[1]);
                IFish fish = null;
                double weight = double.Parse(data[3], CultureInfo.InvariantCulture);

                switch (data[2])
                {
                    case "keszeg":
                        fish = Carp.Instance();
                        break;
                    case "ponty":
                        fish = Bream.Instance();
                        break;
                    case "harcsa":
                        fish = Catfish.Instance();
                        break;
                }

                // fish = keyValuePairs[data[2]];

                f.Catch(cdate, fish, weight, con);
            }
        }
    }
}
