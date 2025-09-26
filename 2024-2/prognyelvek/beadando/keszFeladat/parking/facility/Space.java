package parking.facility;
import vehicle.Car;
import vehicle.Size;

public class Space{
    //------------------------------
    //konstruktor
    //------------------------------
    public Space(int floorNumber, int spaceNumber){
        this.floorNumber = floorNumber;
        this.spaceNumber = spaceNumber;
    }

    //------------------------------
    //parkolo szint
    //------------------------------
    private final int floorNumber;
    public int getFloorNumber(){
        return floorNumber;
    }

    //------------------------------
    //parkolo hely szam
    //------------------------------
    private final int spaceNumber;
    public int getSpaceNumber(){
        return spaceNumber;
    }

    //------------------------------
    //parkolo auto
    //------------------------------
    private Car occupyingCar;
    public void addOccupyingCar(Car c){
        this.occupyingCar = c;
    }
    public void removeOccupyingCar(){
        this.occupyingCar = null;
    }
    public Size getOccupyingCarSize(){
        return occupyingCar.getSpotOccupation();

    }

    //------------------------------
    //foglalt metodus
    //------------------------------
    public boolean isTaken(){
        return occupyingCar!=null;
    }

    //------------------------------
    //auto rendszam getter
    //------------------------------
    public String getCarLicensePlate(){
        return occupyingCar.getLicensePlate();
    }

}