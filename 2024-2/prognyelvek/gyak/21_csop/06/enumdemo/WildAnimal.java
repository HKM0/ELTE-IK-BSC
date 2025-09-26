public enum WildAnimal {
    MONKEY("bananas", 10), // you can pass parameters to the constructor here in the enumeration
    ELEPHANT("raspberries", 100),
    GIRAFFE("apples", 15),
    RACCOON("walnuts", 20);

    // Enum types can also have fields
    public String food;
    public int amount;

    // Enum types can also have constructors (these cannot be public, though)
    WildAnimal(String food_, int amount_) {
        this.food = food_;
        this.amount = amount_;
    }

    // Enum types can also have static methods
    public static String listAllAnimals() {
        StringBuilder strBuilder = new StringBuilder();
        for (WildAnimal animal : WildAnimal.values()) { // values() returns an array of all the enumerated symbols
            strBuilder.append(animal.ordinal() + ": "); // ordinal() returns the constant integer value of an enum symbol
            strBuilder.append(animal.name() + " ");     // name() returns the name of an enum symbol
            strBuilder.append("likes to eat ");
            strBuilder.append(animal.amount * 7); // number of days
            strBuilder.append(" " + animal.food + " a week.\n");
        }
        return strBuilder.toString();
    }

    public String toString() {
        return "A(n) " + this.name() + " likes to eat " + this.amount + " " + this.food + " a day.";
    }
}