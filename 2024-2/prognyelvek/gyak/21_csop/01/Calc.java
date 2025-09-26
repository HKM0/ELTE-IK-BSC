class Calc {
    public static void main(String[] args) {
        int x;
        int y;

        // Assume that args are actually numbers
        if (args.length == 2) {
            x = Integer.parseInt(args[0]);
            y = Integer.parseInt(args[1]);
        }
        else {
            x = Integer.parseInt(System.console().readLine("Num1: "));
            y = Integer.parseInt(System.console().readLine("Num2: "));
        }

        // Calc
        System.out.println("Sum: " + (x + y)); // Note the order of executions
        System.out.println("Difference: " + (x - y)); // In order for + operators to work in an arithmetic fashion, correct use of parentheses are required
        System.out.println("Product: " + (x * y)); // Note that the "outer" + operator will concatenate the result of our calculation as a String to the other String operand
        // Conditional statements work much like in C
        if (y != 0) {
            System.out.println("Quotient: " + (x / y));
            System.out.println("Modulo: " + (x % y));
        }

    }
}