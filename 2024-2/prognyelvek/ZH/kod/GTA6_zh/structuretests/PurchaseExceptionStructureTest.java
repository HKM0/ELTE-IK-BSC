package structuretests;

import static check.CheckThat.*;
import static check.CheckThat.Condition.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.MethodOrderer.*;
import check.*;

@TestMethodOrder(OrderAnnotation.class)
public class PurchaseExceptionStructureTest {
    @BeforeAll
    public static void init() {
        CheckThat.theCheckedException("progress.upgrades.util.PurchaseException")
                 .thatIs(FULLY_IMPLEMENTED, INSTANCE_LEVEL, VISIBLE_TO_ALL)
                 ;
    }

    @Test @DisabledIf(notApplicable) @Order(2_00)
    public void constructor() {
        it.hasConstructor(withParams("message: String"))
            .thatIs(VISIBLE_TO_ALL);
    }

}

