import static check.CheckThat.*;
import static check.CheckThat.Condition.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.MethodOrderer.*;
import check.*;

@TestMethodOrder(OrderAnnotation.class)
public class ParkingLotStructureTest {
    @BeforeAll
    public static void init() {
        CheckThat.theClass("parking.ParkingLot")
                 .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL);
    }

    @Test @DisabledIf(notApplicable) @Order(1_00)
    public void fieldFloorPlan() {
        it.hasField("floorPlan: array of array of parking.facility.Space")
            .thatIs(INSTANCE_LEVEL, NOT_MODIFIABLE, VISIBLE_TO_NONE)
            .thatHas(GETTER)
            .thatHasNo(SETTER);
    }

    @Test @DisabledIf(notApplicable) @Order(2_00)
    public void constructorWithNumberOfFloorsAndNumberOfSpaces() {
        it.hasConstructor(withParams("floorNumber: int", "spaceNumber: int"))
            .thatIs(VISIBLE_TO_ALL)
            .thatThrows("IllegalArgumentException");
    }

    @Test @DisabledIf(notApplicable) @Order(3_00)
    public void methodGetFloorPlan() {
        it.hasMethod("getFloorPlan", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("array of array of parking.facility.Space");
    }

    @Test @DisabledIf(notApplicable) @Order(3_01)
    public void text() {
        it.has(TEXTUAL_REPRESENTATION);
    }
}
