public class ExceptionDemo {
    public static void main(String[] args) {
        // In Java there are checked and unchecked exceptions that may be throwns by programs.
        // Unchecked exceptions do not have to be handled in order to compile and run programs.
        // However, if an unhandled exception is thrown at runtime, the program will abort.
        // This may be useful in some situations, for example during development, aborting may
        // help identify and prevent faulty usage of our classes or methods by our colleagues (or ourselves).
        // However, if we wish to ensure our program will terminate successfully, even if an exception is thrown,
        // we can catch it.
        try { // We 'try' running this block of code
            if (Double.parseDouble(args[1]) == 0) {
                throw new ArithmeticException("Dont divide by zero :("); // It may throw an exception here
            }
            // If the above ArithmeticException is thrown, all the code below it will not execute, instead we execute the code in the relevant catch block
            double myNum = Double.parseDouble(args[0]) / Double.parseDouble(args[1]);
            System.out.println(myNum);
        }
        catch (ArithmeticException e) { // We 'catch' that ArithmeticException, handle it in this block of code and the program keeps running
            System.out.println("Dont divide by zero :(");
        }
        catch (NumberFormatException e) { // We can stack catch blocks in case our try block can potentially throw more than one kind of exception
            System.out.println("Pls give me a number :(");
        }
        finally { // Whether or not an exception is thrown in our try block, this block of code will be executed
            System.out.println("K thx bye"); // This is useful if we want to execute crucial codes
                                             // even if the code in the try block fails to execute completely
        }
        // All the above exceptions are unchecked. This means that these try-catch blocks are completely optional.
        // We only wrote them because we want our program to terminate successfully instead of aborting.
        // For an explanation of checked exceptions, see the filereaderdemo.
    }
}