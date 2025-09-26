package zoo;
// Packages serve as the "next step" in the logical organization of our codes beyond methods and classes.
// A class can be declared to be part of a package with the package statement followed by the name of the package,
// which must always be at the top of the source code in the file.
// Classes that logically serve some similar purpose to each other or work together closely may be organized in the same package.

// Package names must exactly follow the folder names containing the source code. Inversely, the names of the folders
// must be the same as the name of the package inside them. Package names are usually written with a lowercase initial letter.

import zoo.people.staff.Caretaker;
import zoo.people.*;
import zoo.animals.*;

public class Zoo {
    public static void main(String[] args) {
        Kangoroo kangoroo = new Kangoroo("Jack", 3);
        Staff staff = new Caretaker("Joe", 5000);
        Visitor visitor = new Visitor("Jim", 21);

        System.out.println(staff.name);
    }
}

// You can run a main program organized inside a package by passing it's full name to the JVM:
// javac zoo/Zoo.java
// java zoo.Zoo