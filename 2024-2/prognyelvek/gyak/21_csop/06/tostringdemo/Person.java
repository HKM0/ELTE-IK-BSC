public class Person {
    public String firstname;
    public String lastname;
    public int age;

    public Person(String firstname_, String lastname_, int age_) {
        this.firstname = firstname_;
        this.lastname = lastname_;
        this.age = age_;
    }

    // The toString() method is inherited from the Object class. All our classes written in Java
    // inherit from the Object class, which means all our classes have all the fields and methods
    // that the Object class has. The purpose of the toString() method is to describe our object
    // with a String or to return a String that represents our object based on it's field values.
    // If you don't create an implementation, the toString() method will return the name of the class
    // and something else. If you do create your own implementation, you may represent your object
    // as you wish, using it's fields. It is usually a good idea to describe our object to the last detail,
    // but really this is up to you to decide.

    /* public String toString() {
        return this.firstname + " " + this.lastname;
    } */

    /* public String toString() {
        return this.firstname + " " + this.lastname + ", aged " + this.age;
    } */

    public String toString() {
        return this.firstname + " " + this.lastname + " (" + this.age + ")";
    }
}