package vehicle;
import vehicle.Size;
public class Car{

    //------------------------------
    //konstruktor
    //------------------------------
    public Car(String licensePlate, Size spotOccupation, int preferredFloor){
        this.licensePlate = licensePlate;
        this.spotOccupation = spotOccupation;
        this.preferredFloor = preferredFloor;
    }

    //------------------------------
    //rendszam
    //------------------------------
    private final String licensePlate;
    public String getLicensePlate(){
        return licensePlate;
    }

    //------------------------------
    //méret
    //------------------------------
    private final Size spotOccupation;
    public Size getSpotOccupation(){
        return spotOccupation;
    }

    //------------------------------
    //parkolo szint
    //------------------------------
    private int preferredFloor;
    public int getPreferredFloor(){
        return preferredFloor;
    }
    public void setPreferredFloor(int preferredFloor){
        this.preferredFloor = preferredFloor;
    }

    //------------------------------
    //parkolo jegy
    //------------------------------
    private String ticketId;
    public String getTicketId(){
        return ticketId;
    }
    public void setTicketId(String ticketId){
        this.ticketId = ticketId;
    }
}