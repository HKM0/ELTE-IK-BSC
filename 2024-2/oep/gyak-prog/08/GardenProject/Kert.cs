using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace GardenProject
{
    public class Kert
    {
        private List<Parcella> parcellak;

        public Kert(int n)
        {
            parcellak = new List<Parcella>();
            for (int i = 0; i < n; i++)
            {
                parcellak.Add(new Parcella());
            }
        }

        public void Ultet(int hova, NovenyFajta f, int honap)
        {
            parcellak[hova].Ultet(f, honap);
        }

        public List<int> Szedheto(int honap)
        {
            List<int> szedheto = new List<int>();

            for (int i = 0; i < parcellak.Count; i++)
            {
                if (parcellak[i].Beerik(honap))
                {
                    szedheto.Add(i);
                }
            }

            return szedheto;
        }

        public void Leszed(int hol)
        {
            parcellak[hol].Leszed();
        }
    }
}
