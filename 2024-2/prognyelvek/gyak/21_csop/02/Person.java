// Object oriented programming is an intuitive programming paradigm that lets us create abstract models
// in which we can create classes that describe objects in our model. These classes serve to encapsulate
// data and methods that all relate to a type of object in our model. For example, if we wish to create a model
// where we can represent different persons and select the oldest or tallest among them, we may start with an
// abstract representation of a real life person that describes age, height, name, etc.
// Note that in this case, abstraction means that we disregard a million other properties of a real life person
// and only represent those that are relevant to us.
// Please do not confuse this term with abstract classes, which is a more advanced tool of object oriented programming.

// This Person class encapsulates the relevant data that can describe a person for our programming needs.
// In a main program, we can instantiate several different instances of this Person class,
// which will all be of type Person, but may have different field values.
// For example, in a main program we may have an instance of a Person whose "name" field has the value "Jane Doe",
// while another instance of the class might have a "name" with the value "John Smith".
// They will both be Persons and share the same properties that describe them,
// but the values of their properties may be different.
// Another example that has an implementation can be found in our Point.java and PointMain.java files.

class Person {
    int age;
    int height;
    String name;
    int ID;
}

// Other features of object oriented programming are access modifiers and inheritance.
// These will be discussed later.