using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CactusFeladat
{
    public class CactusReader
    {
        private StreamReader stream;

        public CactusReader(string fileName)
        {
            stream = new StreamReader(fileName);
        }

        public Cactus? Next()
        {
            var line = stream.ReadLine();
            if (line == null || line == "")
            {
                return null;
            }

            var data = line.Split();
            var cactus = new Cactus(
                data[0],
                data[1],
                data[2],
                int.Parse(data[3])
                );

            return cactus;
        }

        public bool Next(out Cactus cactus)
        {
            var line = stream.ReadLine();
            if (line == null || line == "")
            {
                cactus = new();
                return false;
            }

            var data = line.Split();
            cactus = new Cactus(
                data[0],
                data[1],
                data[2],
                int.Parse(data[3])
                );

            return true;
        }
    }
}
