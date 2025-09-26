package parking;

import parking.facility.*;
import parking.ParkingLot;
import vehicle.*;

import static check.CheckThat.*;
import static check.CheckThat.Condition.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.extension.*;
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import check.*;

public class ParkingLotTest{
    @Test
    public void testConstructorWithInvalidValues(){
        try {
            ParkingLot a = new ParkingLot(0,0);
        }catch(IllegalArgumentException b){
            //System.out.prinln("7 törpe"); //nem importoltam xd
            return;
        }catch(Exception c){
            fail();
        }
    }

    @Test
    public void testTextualRepresentation(){
        ParkingLot ize = new ParkingLot(3,5);
        Car ka1 = new Car("abc123", Size.SMALL, 1);
        Car ka2 = new Car("abc124", Size.SMALL, 2);
        Car na1 = new Car("def456", Size.LARGE, 1);
        Car na2 = new Car("def457", Size.LARGE, 2);

        ize.getFloorPlan()[0][1].addOccupyingCar(ka1);
        ize.getFloorPlan()[0][2].addOccupyingCar(ka2);
        ize.getFloorPlan()[1][0].addOccupyingCar(na1);
        ize.getFloorPlan()[2][4].addOccupyingCar(na1);

        /*
        X X X X L
        L X X X X
        X X S X X
        */

        ize.getFloorPlan()[0][1].removeOccupyingCar();
        String vartkimenet = "X X X X L\n"+"L X X X X\n"+"X X S X X\n";
        assertEquals(vartkimenet, ize.toString());
    }
}