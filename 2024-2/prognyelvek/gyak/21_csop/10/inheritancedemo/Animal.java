package inheritancedemo;

public abstract class Animal {
    protected int age;
    protected int expectedLifespan;
    protected int numberOfLegs;

    public Animal(int age, int expectedLifespan, int numberOfLegs) {
        this.age = age;
        this.expectedLifespan = expectedLifespan;
        this.numberOfLegs = numberOfLegs;
    }
}