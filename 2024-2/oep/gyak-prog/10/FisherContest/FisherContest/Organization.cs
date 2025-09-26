//Author:   Gregorics Tibor
//Date:     2023.03.23.
//Title:    FisherContest

using System;
using System.Collections.Generic;

namespace Fisher_Contest
{
    public class Organization
    {
        public class MemberAlreadyException : Exception { }
        public class ExistingContestException : Exception { }

        private readonly List<Contest> contests = new ();
        private readonly List<Fisher> members = new ();

        public void Join(Fisher fisher)
        {
            if (members.Contains(fisher)) throw new MemberAlreadyException ();
            members.Add(fisher);
        }

        public bool Member(Fisher fisher)
        { 
            return members.Contains(fisher); 
        }

        public Contest Organize(string place, DateTime start)
        {
            bool l = false;
            foreach (Contest c in contests)
            {
                if (l = (c.place == place) && c.Start == start) break;
            }
            if (l) throw new ExistingContestException();

            Contest contest = new (this, place, start);
            contests.Add(contest);
            return contest;
        }
        public bool BestContest(out Contest contest)
        {
            bool l = false;
            contest = null;
            double max = 0.0;
            foreach (Contest c in contests)
            {
                if (!c.AllCatfishes()) continue;
                double s = c.TotalAmount();
                if (l)
                {
                    if (s > max)
                    {
                        contest = c; max = s;
                    }
                }
                else
                {
                    l = true; contest = c; max = s;
                }
            }
            return l;
        }
        public Fisher Search(string name)
        {
            foreach (Fisher fisher in members)
            {
                if (fisher.name == name) return fisher;
            }
            return null;
        }
    }
}
