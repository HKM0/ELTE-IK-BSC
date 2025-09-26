import java.io.FileReader;
import java.io.FileNotFoundException;
import java.io.File;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.FileWriter;
import java.io.BufferedWriter;
// import java.io.*;

public class Sum {
    public static void main(String[] args) {
        BufferedReader buffReader = null; // We declare these references outside of the try block
        BufferedWriter buffWriter = null; // to extend their lifespan beyond the try block, because
                                          // we will need to close these readers and writers outside of the try block.

        try {
            File inFile = new File("in.txt"); // We can open the file like this
            // FileReader freader = new FileReader(inFile); // A FileReader could be used to solve this exercise,
                                                            // but we will be fancy and use a BufferedReader for
                                                            // extra functionality and optimization.

            // These can throw FileNotFoundExceptions, which are checked exceptions in Java.
            // This means we must handle (or declare) them in order to succesfully compile our program.
            // This is the reason we are now operating within a try block.
            buffReader = new BufferedReader(new FileReader(inFile)); // This takes an input stream, in this case, a file
            buffWriter = new BufferedWriter(new FileWriter("out.txt")); // This takes an output stream, in this case... a file
            // FileWriter will create the output file if it doesn't yet exist! Super convenient.

            String line;
            // We exploit the workings of the assignment operator to read all lines of the input file.
            // First we call the readLine() method of our reader in order to read the file until a newline char is found.
            // Then we assign it's return value to the line variable. The = operator returns whatever it assigned to a variable.
            // So in this case, we can assign the line from the file to the line variable AND check it's value within a logical expression.
            // readLine() returns null if it failed to read anything from the file. In this case, that means
            // there are no more lines in the file and the loop may end.
            while ((line = buffReader.readLine()) != null) {
                int sum = 0;
                String[] lineChunks = line.split(","); // The split() method returns an array of Strings, it's elements will contain chunks of the original string split at the given delimiter characters
                for (String alphanumeric : lineChunks) { // woo fancy foreach loop
                    sum += Integer.parseInt(alphanumeric);
                }
                // System.out.println(sum); // exercise a)

                // The valueOf() method of the String class can parse a number into an alphanumeric String
                buffWriter.write(String.valueOf(sum), 0, String.valueOf(sum).length()); // exercise b)
                // the write() method writes the given String to the output stream of the writer
                // beginning from the character indexed by the second parameter (0) counting up to the second parameter 
                // (in this case, however long String.valueOf(sum) is, in order to write all of it to the output)
                buffWriter.newLine();
            }
        }
        catch (FileNotFoundException e) { // This is a checked exception, so it must be caught and handled, if there is any chance it will be thrown
            System.out.println("No such file :(");
        }
        catch (IOException e) { // This is checked too
            System.out.println("IO error :(");
        }
        catch (NumberFormatException e) { // This is an unchecked exception, but still, as civilised programmers, we catch and handle it for good measure
            System.out.println("The file contained something that isn't a number :(");
        }
        finally {
            try { // Even the closing method of readers and writers may throw the checked IOException, so we embed another try-catch block into the finally block of the outer try-catch
                buffReader.close();
                buffWriter.close();
            }
            catch (IOException e) {
                System.out.println("IO error when closing the streams :(");
            }
        }
    }
}