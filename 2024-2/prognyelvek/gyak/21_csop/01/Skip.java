class Skip {
    // This main function is the entry point for all our programs in Java
    public static void main(String[] args) {
        // Does absolutely nothing
    }
}

// After compiling Skip.java, you can execute the program with the command
// java Skip
// Note the Skip.class file that was created after compiling. This contains the bytecode of our program
// and the Java Virtual Machine (JVM) will execute the program by interpreting this bytecode

// If you are in a different directory, you will need to specify where the Java class containing
// the main program we wish to execute can be found. This can be done with the -classpath argument
// java -classpath path/to/main/class Skip

// Important: Note that the name of the class is the exact same (including case sensitivity) 
// as the name of the file containing it. This is a convention used in all our Java programs.
// Another related convention is to ALWAYS start the names of our classes with a capital letter. 