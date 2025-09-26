package parking.facility;
import vehicle.Car;
import parking.ParkingLot;
import parking.facility.Space;
import java.util.ArrayList;
import vehicle.Size;

public class Gate{
    //------------------------------
    //autok lista
    //------------------------------
    private final ArrayList<Car> cars;
    //------------------------------
    //parkolo 
    //------------------------------
    private final ParkingLot parkingLot;

    //------------------------------
    //konstruktor
    //------------------------------
    public Gate(ParkingLot parkingLot){
        this.parkingLot = parkingLot;
        this.cars = new ArrayList<>();
    }

    //------------------------------
    //auto megkeresése 
    //------------------------------
    private Space findTakenSpaceByCar(Car c){
        Space[][] fplan = parkingLot.getFloorPlan();
        for (int i = 0; i < fplan.length; i++) {
            for (int j = 0; j < fplan[i].length; j++) {
                Space hely = fplan[i][j];
                if (hely.isTaken() && hely.getCarLicensePlate().equals(c.getLicensePlate())) {
                    return hely;
                }
            }
        }
        return null;
    }

    //------------------------------
    //szabad hely keresése adott szinten 
    //------------------------------
    private Space findAvailableSpaceOnFloor(int floor, Car c){
        Space[][] fplan = parkingLot.getFloorPlan();
        if (floor < 0 || floor >= fplan.length) {
            return null;
        }
        if (c.getSpotOccupation() == Size.LARGE) {
            for (int j = 0; j < fplan[floor].length - 1; j++) {
                if (!fplan[floor][j].isTaken() && !fplan[floor][j + 1].isTaken()) {
                    return fplan[floor][j];
                }  
            }
        } else {
            for (int j = 0; j < fplan[floor].length; j++) {
                if (!fplan[floor][j].isTaken()) {
                    return fplan[floor][j];
                }
            }
        }
        return null;
    }

    //------------------------------
    //bármely szabad hely keresése 
    //------------------------------
    public Space findAnyAvailableSpaceForCar(Car c){
        Space[][] fplan = parkingLot.getFloorPlan();
        for (int i = 0; i < fplan.length; i++) {
            
            for (int j = 0; j < fplan[i].length; j++) {
                Space hely = fplan[i][j];
                if (!hely.isTaken()) {
                    return hely;
                }
            }
        }
        return null;
    }

    //------------------------------
    //preferált szabad hely keresése 
    //------------------------------
    public Space findPreferredAvailableSpaceForCar(Car c){
        int pref = c.getPreferredFloor();
        int szintSzam = parkingLot.getFloorPlan().length;
        Space s = null;
        for (int i=0; s==null ; i++) {
            int le = pref - i;
            int fel = pref + i;
            if (pref >= 0){
                s = findAvailableSpaceOnFloor(le, c);
                if (s != null){
                    return s;
                }
            }
            s = findAvailableSpaceOnFloor(fel, c);
            if (s != null) {
                return s;
            }
        }
        return null;
    }

    //------------------------------
    //auto regisztralasa - kesz
    //------------------------------
    public boolean registerCar(Car c){
        if (cars.contains(c)){ 
            return false;
            }
        Space hely = findPreferredAvailableSpaceForCar(c);
        if (hely == null){
            return false;
            }
        hely.addOccupyingCar(c);
        cars.add(c);
        c.setTicketId(c.getLicensePlate());
        return true;
    }

    //------------------------------
    //tobb auto regisztralasa
    //------------------------------
    public void registerCars(Car[] autoLista) {
        for (Car c : autoLista) {
            if (!registerCar(c)) {
                System.err.println(c.getLicensePlate() + "-as rendszámú Ladának nincs hely xD.");
            }
        }
    }

    //------------------------------
    //deregisztralas ticketId-vel - kesz
    //------------------------------
    public void deRegisterCar(String ticketId){
        Car keresett = null;
        for (Car c : cars) {
            if (ticketId.equals(c.getTicketId())) {
                keresett = c;
                break;
            }
        }
        if (keresett != null) {
            Space hely = findTakenSpaceByCar(keresett);
            if (hely != null) {
                hely.removeOccupyingCar();
            }
            cars.remove(keresett);
        }
    }
}