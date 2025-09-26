using System.Net.Mail;

namespace Microwave
{
    class Lamp
    {
        private bool light_is_on = false;

        public void Send(ESignal signal)
        {
            switch (signal)
            {
                case ESignal.Started:
                case ESignal.Opened:
                    if (!light_is_on)
                    {
                        light_is_on = true;
                    }
                    break;

                case ESignal.Closed:
                case ESignal.Stopped:
                    if (light_is_on)
                    {
                        light_is_on = false;
                    }
                    break;
            }
        }

        public override string ToString()
        {
            return "lamp " + (light_is_on ? "is lighting" : "is not lighting");
        }
    }
}
