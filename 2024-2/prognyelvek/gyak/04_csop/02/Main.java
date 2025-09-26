public class Main {
    public static void main(String[] args){
        //villamos
        tram tram1 = new tram(10);
        ////System.out.println(tram1.MaxPassengerCount);
        ////tram1.passengers[0] = "Kovács Béla";
        
        System.out.println(tram1.getMaxPassengerCount());
        
        tram1.putPassenger("Kovács Béla", 0);

        System.out.println(tram1.getPassengers()[0]);

        String[] actPassenger = tram1.getPassengers();

        tram1.getPassengers()[0] = "K";

        System.out.println(tram1.getPassengers()[0]);
        
    }
}
