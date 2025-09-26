using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Map
{
    public struct Item
    {
        public int key;
        public string value;

        public Item(int key, string value)
        {
            this.key = key;
            this.value = value;
        }
    }

    public struct ItemX<T>
    {
        public int key;
        public T value;

        public ItemX(int key, T value)
        {
            this.key = key;
            this.value = value;
        }
    }

    public class Map
    {
        public class NonExistingKeyException : Exception
        {
            public int key;

            public NonExistingKeyException(int key)
            {
                this.key = key;
            }
        }

        public class ExistingKeyException : Exception
        {
            public int key;

            public ExistingKeyException(int key)
            {
                this.key = key;
            }
        }


        private List<Item> seq = new();

        public void SetEmpty()
        {
            seq.Clear();
        }

        public int Count()
        {
            return seq.Count;
        }

        public void Insert(Item e)
        {
            (bool l, int ind) = LogSearch(e.key);
            if (l) throw new ExistingKeyException(e.key);
            seq.Insert(ind, e);
        }

        public void Remove(int key)
        {
            (bool l, int ind) = LogSearch(key);
            if (!l) throw new NonExistingKeyException(key);
            seq.RemoveAt(ind);
        }


        public bool In(int key)
        {
            (bool l, int ind) = LogSearch(key);
            return l;
        }

        public string Get(int key)
        {
            return this[key];
        }

        public string this[int key]
        {
            get
            {

                (bool l, int ind) = LogSearch(key);
                if (!l) throw new NonExistingKeyException(key);
                return seq[ind].value;
            }
        }

        (bool, int) LogSearch(int key)
        {
            bool l = false;
            int ah = 0;
            int fh = seq.Count - 1;
            int ind = 0;

            while (!l && ah <= fh)
            {
                ind = (ah + fh) / 2;

                if (seq[ind].key == key)
                {
                    l = true;
                }
                else if (seq[ind].key < key)
                {
                    ah += 1;
                }
                else if (seq[ind].key > key)
                {
                    fh -= 1;
                }
            }
            if(!l)
            {
                ind = ah;
            }
            return (l, ind);
        }
    }
}
