package inheritancedemo;

public class Main {
    public static void main(String[] args) throws AnimalException {
        Zoo zoo = new Zoo();
        System.out.println(zoo.toString());
        
        try {
            throw new AnimalException("This is an AnimalException demo!");
        }
        catch (AnimalException e) {
            System.out.println(e.getMessage());
        }
    }
}