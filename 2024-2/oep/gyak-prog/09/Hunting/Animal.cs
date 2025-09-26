using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hunting
{
    public enum Gender
    {
        Male,
        Female
    }
    public abstract class Animal
    {
        public double Weight { get; }

        // protected double weight;
        // public double Weight_ { get { return weight; } }

        public Gender Gender { get; }

        public Animal(double weight, Gender gender)
        {
            Weight = weight;
            Gender = gender;
        }
    }
    public class Elephant : Animal
    {
        public double Left { get; }
        public double Right { get; }

        public Elephant(double weight, Gender gender, double left, double right) : base(weight, gender)
        {
            Left = left;
            Right = right;
        }
    }
    public class Rhino : Animal
    {
        public double Horn { get; }

        public Rhino(double weight, Gender gender, double horn) : base(weight, gender)
        {
            Horn = horn;
        }
    }
    public class Lion : Animal
    {
        public Lion(double weight, Gender gender) : base(weight, gender) { }
    }
}
