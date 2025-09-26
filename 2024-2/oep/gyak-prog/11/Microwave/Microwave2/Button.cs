namespace Microwave
{
    class Button
    {
        private Magnetron magnetron;

        public void Control(Magnetron magnetron)
        {
            this.magnetron = magnetron;
        }

        public void Press()
        {
            magnetron.Send(ESignal.Pressed);
        }
    }
}
