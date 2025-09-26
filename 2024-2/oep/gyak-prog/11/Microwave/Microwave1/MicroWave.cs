namespace Microwave
{
    class MicroWave
    {
        public Button button;
        public Lamp lamp;
        public Door door;
        public Magnetron magnetron;

        public MicroWave()
        {
            lamp = new Lamp();
            magnetron = new Magnetron();
            button = new Button();
            door = new Door();

            magnetron.Control(door, lamp);
            button.Control(magnetron);
            door.Control(lamp, magnetron);
        }

        public override string ToString()
        {
            return string.Format($"{magnetron,-25}, {lamp,-20}, {door,-25}");
        }
    }
}
