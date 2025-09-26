using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GardenProject
{
    public abstract class NovenyFajta
    {
        protected int eresiIdo;

        public int EresiIdo { get => eresiIdo; }

        // public int EresiIdo { get; protected set; }

        public NovenyFajta(int i)
        {
            eresiIdo = i;
        }

        public virtual bool IsZoldseg()
        {
            return false;
        }

        public virtual bool IsZoldsegProperty { 
            get { return false; }
        }

        public virtual bool IsVirag()
        {
            return false;
        }

        public abstract bool IsViragAbstract();
    }

    public abstract class Zoldseg : NovenyFajta
    {
        public Zoldseg(int i) : base(i)
        {
        }

        public override bool IsZoldseg()
        {
            return true;
        }

        public override bool IsZoldsegProperty
        {
            get { return true; }
        }

        public override bool IsViragAbstract()
        {
            return false;
        }
    }

    public class Burgonya : Zoldseg
    {
        private static Burgonya instance;

        public static Burgonya Instance()
        {
            if(instance == null)
            {
                instance = new Burgonya();
            }
            return instance;
        }

        private Burgonya() : base(3)
        {
        }
    }

    public class Hagyma : Zoldseg
    {
        private static Hagyma instance;

        public static Hagyma Instance()
        {
            if (instance == null)
            {
                instance = new Hagyma();
            }
            return instance;
        }

        private Hagyma() : base(2)
        {
        }
    }

    public class Borso : Zoldseg
    {
        private static Borso instance;

        public static Borso Instance()
        {
            if (instance == null)
            {
                instance = new Borso();
            }
            return instance;
        }

        private Borso() : base(4)
        {
        }
    }


    public abstract class Virag : NovenyFajta
    {
        public Virag(int i) : base(i)
        {
        }

        public override bool IsVirag()
        {
            return true;
        }

        public override bool IsViragAbstract()
        {
            return true;
        }
    }

    public class Tulipan : Virag
    {
        private static Tulipan instance;

        public static Tulipan Instance()
        {
            if (instance == null)
            {
                instance = new Tulipan();
            }
            return instance;
        }

        private Tulipan() : base(5)
        {
        }
    }

    public class Szegfu : Virag
    {
        private static Szegfu instance;

        public static Szegfu Instance()
        {
            instance = instance ?? new();
            return instance;
        }

        private Szegfu() : base(2)
        {
        }
    }

    public class Rozsa : Virag
    {
        private static Rozsa instance;

        public static Rozsa Instance()
        {
            if (instance == null)
            {
                instance = new Rozsa();
            }
            return instance;
        }

        private Rozsa() : base(6)
        {
        }
    }
}
