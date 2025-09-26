namespace Microwave
{
    class Door
    {
        public override string ToString()
        {
            return "door " + (Closed ? "has been closed" : "is open");
        }
    }
}
