namespace Microwave
{
    class Magnetron
    {
        public override string ToString()
        {
            return "magnetron " + (working ? "is working" : "is not working");
        }
    }
}
