public class Main {
    public static void main(String[] args) {
        //Create a new Auto object with the following parameters: "ABC-123", 5
        Auto auto_1 = new Auto("ABC-123", 5);
        Auto auto_2 = new Auto("DEF-456", 4);

        //Print the license plate and the number of seats of the auto_1 object
        System.out.println(auto_1.rendszam + " " + auto_1.ulesDb);  
        auto_1.PrintTuTu();
        auto_2.PrintTuTu();
    }
}