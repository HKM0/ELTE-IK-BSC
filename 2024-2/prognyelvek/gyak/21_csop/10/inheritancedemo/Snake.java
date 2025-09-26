package inheritancedemo;

public class Snake extends Animal {
    public static final int LEG_COUNT = 0;
    private int length;
    private VenomType venomType;

    public Snake(int age, int expectedLifespan, int length, VenomType venomType) {
        super(age, expectedLifespan, Snake.LEG_COUNT);
        this.length = length;
        this.venomType = venomType;
    }

    @Override
    public String toString() {
        return "I am a Snake with " + this.numberOfLegs + " legs and a venom that is " + this.venomType.name() + "!";
    }
}