// package exceptiondemo;

public class Echo {
    public static void echo(String fileName) {

        File inFile = new File(fileName);
        // Try block with resource management - this will automatically close the input stream at the end of it's execution
        try (BufferReader buffReader = new BufferedReader(new FileReader(inFile))) {
            String line;
            while ((line = buffReader.readLine()) != null) {
                System.out.println(line);
            }
        }
        catch (FileNotFoundException e) {
            System.err.println("File not found :(");
        }
        catch (NumberFormatException e) {
            System.err.println("File contained something that isn't an integer :(");
        }
    }
}