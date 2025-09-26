import static check.CheckThat.*;
import static check.CheckThat.Condition.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.MethodOrderer.*;
import check.*;

@TestMethodOrder(OrderAnnotation.class)
public class CarStructureTest {
    @BeforeAll
    public static void init() {
        CheckThat.theClass("vehicle.Car")
                 .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL);
    }

    @Test @DisabledIf(notApplicable) @Order(1_00)
    public void fieldLicensePlate() {
        it.hasField("licensePlate: String")
            .thatIs(INSTANCE_LEVEL, NOT_MODIFIABLE, VISIBLE_TO_NONE)
            .thatHas(GETTER)
            .thatHasNo(SETTER);
    }

    @Test @DisabledIf(notApplicable) @Order(1_01)
    public void fieldSpotOccupation() {
        it.hasField("spotOccupation: vehicle.Size")
            .thatIs(INSTANCE_LEVEL, NOT_MODIFIABLE, VISIBLE_TO_NONE)
            .thatHas(GETTER)
            .thatHasNo(SETTER);
    }

    @Test @DisabledIf(notApplicable) @Order(1_02)
    public void fieldPreferredFloor() {
        it.hasField("preferredFloor: int")
            .thatIs(INSTANCE_LEVEL, MODIFIABLE, VISIBLE_TO_NONE)
            .thatHas(GETTER)
            .thatHas(SETTER);
    }

    @Test @DisabledIf(notApplicable) @Order(1_03)
    public void fieldTicketId() {
        it.hasField("ticketId: String")
            .thatIs(INSTANCE_LEVEL, MODIFIABLE, VISIBLE_TO_NONE)
            .thatHas(GETTER)
            .thatHas(SETTER);
    }

    @Test @DisabledIf(notApplicable) @Order(2_00)
    public void constructorWithValues() {
        it.hasConstructor(withParams("licensePlate: String", "spotOccupation: vehicle.Size", "preferredFloor: int"))
            .thatIs(VISIBLE_TO_ALL);
    }

    @Test @DisabledIf(notApplicable) @Order(3_00)
    public void methodGetLicensePlate() {
        it.hasMethod("getLicensePlate", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("String");
    }

    @Test @DisabledIf(notApplicable) @Order(3_01)
    public void methodGetSpotOccupation() {
        it.hasMethod("getSpotOccupation", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("vehicle.Size");
    }

    @Test @DisabledIf(notApplicable) @Order(3_02)
    public void methodGetPreferredFloor() {
        it.hasMethod("getPreferredFloor", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("int");
    }

    @Test @DisabledIf(notApplicable) @Order(3_03)
    public void methodGetTicketId() {
        it.hasMethod("getTicketId", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturns("String");
    }

    @Test @DisabledIf(notApplicable) @Order(3_04)
    public void methodSetPreferredFloor() {
        it.hasMethod("setPreferredFloor", withParams("preferredFloor: int"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturnsNothing();
    }

    @Test @DisabledIf(notApplicable) @Order(3_05)
    public void methodSetTicketId() {
        it.hasMethod("setTicketId", withParams("ticketId: String"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturnsNothing();
    }
}
