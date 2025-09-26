import static check.CheckThat.*;
import static check.CheckThat.Condition.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.MethodOrderer.*;
import check.*;

@TestMethodOrder(OrderAnnotation.class)
public class GateStructureTest {
    @BeforeAll
    public static void init() {
        CheckThat.theClass("parking.facility.Gate")
                 .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL);
    }

    @Test @DisabledIf(notApplicable) @Order(1_00)
    public void fieldCars() {
        it.hasField("cars: ArrayList of vehicle.Car")
            .thatIs(INSTANCE_LEVEL, NOT_MODIFIABLE, VISIBLE_TO_NONE)
            .thatHasNo(GETTER)
            .thatHasNo(SETTER);
    }

    @Test @DisabledIf(notApplicable) @Order(1_01)
    public void fieldParkingLot() {
        it.hasField("parkingLot: parking.ParkingLot")
            .thatIs(INSTANCE_LEVEL, NOT_MODIFIABLE, VISIBLE_TO_NONE)
            .thatHasNo(GETTER)
            .thatHasNo(SETTER);
    }

    @Test @DisabledIf(notApplicable) @Order(2_00)
    public void constructorWithParkingLot() {
        it.hasConstructor(withParams("parkingLot: parking.ParkingLot"))
            .thatIs(VISIBLE_TO_ALL);
    }

    @Test @DisabledIf(notApplicable) @Order(3_00)
    public void methodFindTakenSpaceByCar() {
        it.hasMethod("findTakenSpaceByCar", withParams("c: vehicle.Car"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_NONE)
            .thatReturns("parking.facility.Space");
    }

    @Test @DisabledIf(notApplicable) @Order(3_01)
    public void methodFindAvailableSpaceOnFloor() {
        it.hasMethod("findAvailableSpaceOnFloor", withParams("floor: int", "c: vehicle.Car"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_NONE)
            .thatReturns("parking.facility.Space");
    }

    @Test @DisabledIf(notApplicable) @Order(3_02)
    public void methodFindAnyAvailableSpaceForCar() {
        it.hasMethod("findAnyAvailableSpaceForCar", withParams("c: vehicle.Car"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("parking.facility.Space");
    }

    @Test @DisabledIf(notApplicable) @Order(3_03)
    public void methodFindPreferredAvailableSpaceForCar() {
        it.hasMethod("findPreferredAvailableSpaceForCar", withParams("c: vehicle.Car"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("parking.facility.Space");
    }

    @Test @DisabledIf(notApplicable) @Order(3_04)
    public void methodRegisterCar() {
        it.hasMethod("registerCar", withParams("c: vehicle.Car"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("boolean");
    }

    @Test @DisabledIf(notApplicable) @Order(3_05)
    public void methodRegisterCars() {
        it.hasMethod("registerCars", withParams("cars: vararg of vehicle.Car"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturnsNothing();
    }

    @Test @DisabledIf(notApplicable) @Order(3_06)
    public void methodDeRegisterCar() {
        it.hasMethod("deRegisterCar", withParams("ticketId: String"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturnsNothing();
    }
}
