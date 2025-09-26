//Author:   Gregorics Tibor
//Date:     2023.03.23.
//Title:    FisherContest

using System;
using System.Collections.Generic;

namespace Fisher_Contest
{
    public class Fisher
    {
        public class ExistingCatchingException : Exception { }

        public readonly string name;
        private readonly List<Catching> catchings = new();

        public Fisher(string name) { this.name = name; }

        public void Catch(DateTime time, IFish fish, double weight, Contest contest)
        {
            bool l = false;
            foreach (Catching c in catchings)
            {
                if ( l = c.Time.Equals(time) && c.Contest==contest ) break;
            }
            if (l) throw new ExistingCatchingException();
            catchings.Add(new Catching(time, fish, weight, this, contest));
        }
        public double TotalValue(Contest contest) 
        {
            double s = 0;
            foreach (Catching c in catchings)
            {
                if (c.Contest == contest) s += c.Value();
            }
            return s;
        }
        public int CatfishNumber(Contest contest)
        {
            int no = 0;
            foreach (Catching c in  catchings)
            {
                if (c.Fish is Catfish && c.Contest == contest) ++no;
            }
            return no;
        }
    }
}
