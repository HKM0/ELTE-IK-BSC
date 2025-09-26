package parking.facility;

import static check.CheckThat.*;
import static check.CheckThat.Condition.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.extension.*;
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import check.*;

import parking.ParkingLot;
import vehicle.Car;
import vehicle.Size;

public class GateTest {
    @Test
    public void testFindAnyAvailableSpaceForCar() {
        ParkingLot l = new ParkingLot(2, 2);
        Gate gate = new Gate(l);
        Car c1 = new Car("TRIPPI", Size.SMALL, 1);
        Space s1 = gate.findAnyAvailableSpaceForCar(c1);
        assertEquals(false, s1 == null);
        assertEquals(false, s1.isTaken());

        Car c2 = new Car("TROPPI", Size.LARGE, 2);
        Space s2 = gate.findAnyAvailableSpaceForCar(c2);   
        assertEquals(false, s2 == null);
        assertEquals(false, s2.isTaken());

        Car c3 = new Car("TRALALEO", Size.SMALL, -99);
        Space s3 = gate.findAnyAvailableSpaceForCar(c3);   
        assertEquals(false, s3 == null);
        assertEquals(false, s3.isTaken());

        Car c5 = new Car("TRALALA", Size.LARGE, 99);
        Space s5 = gate.findAnyAvailableSpaceForCar(c5);
        assertEquals(false, s5 == null);
        assertEquals(false, s5.isTaken());
    }

    @ParameterizedTest
    @CsvSource({
        "MEGAKNIGHT, SMALL, 1",
        "LOG, LARGE, 0",
        "WIZAR, SMALL, 5",       
        "GOBLINBARREL, LARGE, 10",
        "ZAP, SMALL, -1",
        "BATS, LARGE, -99",
        "ELECTROWIZARD, SMALL, 1",
        "BALLOON, SMALL, 69"
    })
    public void testFindPreferredAvailableSpaceForCar(String plate, Size size, int preferredFloor) {
        ParkingLot l = new ParkingLot(3, 4);
        Gate gate = new Gate(l);
        Car car = new Car(plate, size, preferredFloor);
        Space space = gate.findPreferredAvailableSpaceForCar(car);
        assertEquals(false, space == null);
        assertEquals(false, space.isTaken());
    }

    @ParameterizedTest
    @CsvSource({
        "TIZENNEGYESBALLON, SMALL, 0",
        "MINIPEKKA, LARGE, -5",
        "BANDIT, SMALL, -10",       
        "MINER, LARGE, 1",
        "ZAP, SMALL, 99",
        "MIRROR, LARGE, -1",
        "CLONE, SMALL, -7",
        "ROYALRECRUITS, SMALL, -99",
        "FIREBALL, SMALL, -4",
        "GIANTSKELETON, LARGE, -6",
        "PEKKA, LARGE, -7",
        
    })
    public void testRegisterCar(String plate, Size size, int preferredFloor) {
        ParkingLot l = new ParkingLot(3, 4);
        Gate gate = new Gate(l);
        Car car = new Car(plate, size, preferredFloor);
        assertEquals(true, gate.registerCar(car));
        assertEquals(plate, car.getTicketId());
        assertEquals(false, gate.registerCar(car));
    }


    @ParameterizedTest
    @CsvSource({
    "DEREG, SMALL, 0",
    "SKIBIDI, LARGE, -77",
    "DOROG, SMALL, 101",
    "DIRIG, LARGE, 12",
    "RETESTESZTA1, SMALL, 0",      
    "RETESTESZTA2, LARGE, 0",     
    "RETESTESZTA3, SMALL, 9999",   
    "RETESTESZTA4, LARGE, 9999",   
    "DUPLACUCC, SMALL, 1",    
    "DUPLACUCC, LARGE, 1"
})
    public void testDeRegisterCar(String plate, Size size, int preferredFloor) {
        ParkingLot l = new ParkingLot(1, 2);
        Gate g = new Gate(l);
        Car c = new Car(plate, size, preferredFloor);
        g.registerCar(c);
        g.deRegisterCar(c.getTicketId());

        assertEquals(false, l.getFloorPlan()[0][0].isTaken());
    }
}
