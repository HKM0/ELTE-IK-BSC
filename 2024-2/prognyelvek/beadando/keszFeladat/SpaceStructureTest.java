import static check.CheckThat.*;
import static check.CheckThat.Condition.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.MethodOrderer.*;
import check.*;

@TestMethodOrder(OrderAnnotation.class)
public class SpaceStructureTest {
    @BeforeAll
    public static void init() {
        CheckThat.theClass("parking.facility.Space")
                 .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL);
    }

    @Test @DisabledIf(notApplicable) @Order(1_00)
    public void fieldFloorNumber() {
        it.hasField("floorNumber: int")
            .thatIs(INSTANCE_LEVEL, NOT_MODIFIABLE, VISIBLE_TO_NONE)
            .thatHas(GETTER)
            .thatHasNo(SETTER);
    }

    @Test @DisabledIf(notApplicable) @Order(1_01)
    public void fieldSpaceNumber() {
        it.hasField("spaceNumber: int")
            .thatIs(INSTANCE_LEVEL, NOT_MODIFIABLE, VISIBLE_TO_NONE)
            .thatHas(GETTER)
            .thatHasNo(SETTER);
    }

    @Test @DisabledIf(notApplicable) @Order(1_02)
    public void fieldCars() {
        it.hasField("occupyingCar: vehicle.Car")
            .thatIs(INSTANCE_LEVEL, MODIFIABLE, VISIBLE_TO_NONE)
            .thatHasNo(GETTER)
            .thatHasNo(SETTER);
    }

    @Test @DisabledIf(notApplicable) @Order(2_00)
    public void constructorWithFloorNumberAndSpaceNumber() {
        it.hasConstructor(withParams("floorNumber: int", "spaceNumber: int"))
            .thatIs(VISIBLE_TO_ALL);
    }

    @Test @DisabledIf(notApplicable) @Order(3_00)
    public void methodIsTaken() {
        it.hasMethod("isTaken", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("boolean");
    }

    @Test @DisabledIf(notApplicable) @Order(3_01)
    public void methodRegisterCar() {
        it.hasMethod("addOccupyingCar", withParams("c: vehicle.Car"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturnsNothing();
    }

    @Test @DisabledIf(notApplicable) @Order(3_02)
    public void methodRemoveOccupyingCar() {
        it.hasMethod("removeOccupyingCar", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturnsNothing();
    }

    @Test @DisabledIf(notApplicable) @Order(3_03)
    public void methodGetCarLicensePlate() {
        it.hasMethod("getCarLicensePlate", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("String");
    }

    @Test @DisabledIf(notApplicable) @Order(3_04)
    public void methodGetOccupyingCarSize() {
        it.hasMethod("getOccupyingCarSize", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("vehicle.Size");
    }

    @Test @DisabledIf(notApplicable) @Order(3_05)
    public void methodGetFloorNumber() {
        it.hasMethod("getFloorNumber", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("int");
    }

    @Test @DisabledIf(notApplicable) @Order(3_06)
    public void methodGetSpaceNumber() {
        it.hasMethod("getSpaceNumber", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("int");
    }
}
