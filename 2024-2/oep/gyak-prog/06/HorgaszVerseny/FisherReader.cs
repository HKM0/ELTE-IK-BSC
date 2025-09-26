using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HorgaszVerseny
{
    internal class FisherReader
    {
        StreamReader reader;

        public FisherReader(string file)
        {
            reader = new StreamReader(file);
        }

        public Fisher? Next()
        {
            string? line = reader.ReadLine();
            if (line == null)
            {
                return null;
            }

            string[] data = line.Split(new char[] {' ', '\t'},
                          StringSplitOptions.RemoveEmptyEntries);

            Fisher fisher = new(data[0]);

            /*
            int count = (data.Length - 1) / 4;

            for (int i = 0; i < count; i++)
            {
                Fish fish = new Fish
                    (
                    data[i*4+1+1],
                    data[i*4+1+0],
                    double.Parse(data[i * 4 + 1 + 2]),
                    double.Parse(data[i * 4 + 1 + 3])
                    );
                fisher.Catches.Add( fish );
            }
            */
            for (int i = 1; i < data.Length; i += 4)
            {
                Fish fish = new Fish
                    (
                    data[i+1],
                    data[i],
                    double.Parse(data[i + 2]),
                    double.Parse(data[i + 3])
                    );
                fisher.Catches.Add(fish);
            }

            return fisher;
        }
    }
}
