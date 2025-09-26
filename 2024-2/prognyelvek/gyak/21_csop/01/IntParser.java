class IntParser {
    public static void main(String[] args) {
        // Class fields
        int x;
        int y;

        // Assume that args are actually numbers
        if (args.length == 2) { // args.length is the number of elements in the array args
            x = Integer.parseInt(args[0]); // Like any civilised programming language, Java starts indexing array elements from 0
            y = Integer.parseInt(args[1]); // Array elements are returned by indexing them between brackets
        }
        else {
            // parseInt() is a method of the Integer class that can parse alphanumerical Strings into int types
            x = Integer.parseInt(System.console().readLine("Num1: "));
            y = Integer.parseInt(System.console().readLine("Num2: "));
            // Similar parsing methods exist for classes Double, Float, etc.
        }

        // For loops (as well as while loops) work much like in C
        for( int i = x; i <= y; i++ ) {
            // If we were to divide an int with another int, the result would be an int type as well
            // Which is often inconvenient when we expect the result to be a rational number
            System.out.println(i/2.0); // We divide with a double type instead, so the result is also of type double
        }
    }
}