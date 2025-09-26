using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuzetFeladat
{
    internal class Fuzet
    {
        private EFuzetTipus tipus;
        private int uresDb;
        private List<string> lapok;

        public Fuzet(EFuzetTipus tip, int n)
        {
            tipus = tip;
            uresDb = n;
            lapok = new List<string>();
            for (int i = 0; i < n; i++)
            {
                lapok.Add("");
            }
        }

        public int LapokDb()
        {
            return lapok.Count;
        }
        public int UresDb()
        {
            return uresDb;
        }

        public void Rair(int ind, string tart)
        {
            if (ind < 0 || ind >= lapok.Count)
            {
                throw new IndexOutOfRangeException();
            }
            if (lapok[ind] != "")
            {
                throw new InvalidOperationException();
            }
            lapok[ind] = tart;
            uresDb--;
        }

        public void Kitep(int ind)
        {
            if (ind < 0 || ind >= lapok.Count)
            {
                throw new IndexOutOfRangeException();
            }
            if(lapok[ind] == "")
            {
                uresDb--;
            }
            lapok.RemoveAt(ind);
        }
    }
}
