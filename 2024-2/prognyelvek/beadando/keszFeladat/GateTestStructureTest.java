import static check.CheckThat.*;
import static check.CheckThat.Condition.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.MethodOrderer.*;
import check.*;

@TestMethodOrder(OrderAnnotation.class)
public class GateTestStructureTest {
    @BeforeAll
    public static void init() {
        CheckThat.theClass("parking.facility.GateTest")
                 .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL);
    }

    @Test @DisabledIf(notApplicable) @Order(3_00)
    public void methodTestFindAnyAvailableSpaceForCar() {
        it.hasMethod("testFindAnyAvailableSpaceForCar", withNoParams())
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturnsNothing();
    }

    @Test @DisabledIf(notApplicable) @Order(3_01)
    public void methodTestFindPreferredAvailableSpaceForCar() {
        it.hasMethod("testFindPreferredAvailableSpaceForCar", withParams("plate: String", "size: vehicle.Size", "preferredFloor: int"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturnsNothing();
    }

    @Test @DisabledIf(notApplicable) @Order(3_02)
    public void methodTestRegisterCar() {
        it.hasMethod("testRegisterCar", withParams("plate: String", "size: vehicle.Size", "preferredFloor: int"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturnsNothing();
    }

    @Test @DisabledIf(notApplicable) @Order(3_03)
    public void methodTestDeRegisterCar() {
        it.hasMethod("testDeRegisterCar", withParams("plate: String", "size: vehicle.Size", "preferredFloor: int"))
            .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
            .thatReturnsNothing();
    }
}
