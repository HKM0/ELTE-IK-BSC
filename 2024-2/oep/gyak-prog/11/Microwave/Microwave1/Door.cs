namespace Microwave
{
    class Door
    {
        private Lamp lamp;
        private Magnetron magnetron;

        public bool Closed { get; set; } = true;

        public void Control(Lamp lamp, Magnetron magnetron)
        {
            this.lamp = lamp;
            this.magnetron = magnetron;
        }

        public void Open()
        {
            if (Closed)
            {
                Closed = false;
                magnetron.Send(ESignal.Opened);
                lamp.Send(ESignal.Opened);
            }
        }
        public void Close()
        {
            if (!Closed)
            {
                Closed = true;
                lamp.Send(ESignal.Closed);
            }
        }

        public override string ToString()
        {
            return "door " + (Closed ? "has been closed" : "is open");
        }
    }
}
