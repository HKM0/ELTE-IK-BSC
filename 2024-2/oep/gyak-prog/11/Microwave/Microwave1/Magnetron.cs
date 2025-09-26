namespace Microwave
{
    class Magnetron
    {
        private bool working = false;
        private Door door;
        private Lamp lamp;

        public void Control(Door door, Lamp lamp)
        {
            this.door = door;
            this.lamp = lamp;
        }

        public void Send(ESignal signal)
        {
            if (working)
            {
                if (signal == ESignal.Opened || signal == ESignal.Pressed)
                {
                    working = false;
                    lamp.Send(ESignal.Stopped);
                }
            }
            else
            {
                if (signal == ESignal.Pressed && door.Closed)
                {
                    working = true;
                    lamp.Send(ESignal.Started);
                }
            }
        }

        public override string ToString()
        {
            return "magnetron " + (working ? "is working" : "is not working");
        }
    }
}
