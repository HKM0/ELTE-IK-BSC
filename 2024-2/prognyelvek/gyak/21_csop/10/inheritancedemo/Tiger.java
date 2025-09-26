package inheritancedemo;

public class Tiger extends Animal {
    private int stripeCount;

    public Tiger(int age, int expectedLifespan, int numberOfLegs, int stripeCount) {
        super(age, expectedLifespan, numberOfLegs);
        this.stripeCount = stripeCount;
    }

    @Override
    public String toString() {
        return "I am a Tiger with " + this.numberOfLegs + " legs!";
    }
}