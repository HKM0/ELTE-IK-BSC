using System;

namespace Microwave
{
    class MicroWave
    {
        public override string ToString()
        {
            return string.Format($"{magnetron,-25}, {lamp,-20}, {door,-25}");
        }
    }
}
