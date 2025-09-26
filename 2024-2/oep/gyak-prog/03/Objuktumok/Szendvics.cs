using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Objuktumok
{
    internal class Szendvics
    {
        private int ar;

        public Szendvics(int ar)
        {
            this.ar = ar;
        }

        public int Ar() { return ar; }

        public void SetAr(int value) { ar = value; }
    }


    internal class SzendvicsHarmadik
    {
        private int ar;

        public SzendvicsHarmadik(int ar)
        {
            this.ar = ar;
        }

        public int Ar { get { return ar; } }
    }

    internal class SzendvicsNegyedik
    {
        private int ar;

        public SzendvicsNegyedik(int ar)
        {
            this.ar = ar;
        }

        public int Ar
        {
            get { return ar; }
            set { ar = value; }
        }
    }

    internal class SzendvicsMasik
    {
        public int ar;

        public SzendvicsMasik(int ar)
        {
            this.ar = ar;
        }
    }

    internal class SzendvicsOtodik
    {
        public SzendvicsOtodik(int ar)
        {
            Ar = ar;
        }

        public int Ar
        {
            get;
            set;
        }
    }

    internal class SzendvicsHatodik
    {
        public SzendvicsHatodik(int ar)
        {
            Ar = ar;
        }

        public void Arnoveles()
        {
            Ar = Ar + 20;
        }

        public int Ar
        {
            get;
            private set;
        }
    }

    internal class SzendvicsHetedik
    {
        private int ar;

        public SzendvicsHetedik(int ar)
        {
            Ar = ar;
        }

        public int Ar
        {
            get {  return ar; }
            set
            {
                if (value <= 0)
                {
                    throw new Exception("Az arnak pozitivnak kell lennie!");
                }
                ar = value;
            }
        }
    }
}
