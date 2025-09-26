class Hello1 {
    // This main function is the entry point for all our programs in Java
    // args is an array of Strings
    public static void main(String[] args) {
        String name = System.console().readLine("What is your name? "); // Read from the keyboard until a newline character is entered
        // System.console().printf("Hello " + name + "\n");
        System.out.println("Hello " + name); // Print to the console
    }
}

// After compiling Hello1.java, you can execute the program with the command
// java Hello1
// Note the Hello1.class file that was created after compiling. This contains the bytecode of our program
// and the Java Virtual Machine (JVM) will execute the program by interpreting this bytecode