import static check.CheckThat.*;
import static check.CheckThat.Condition.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.MethodOrderer.*;
import check.*;

@TestMethodOrder(OrderAnnotation.class)
public class SizeStructureTest {
    @Test
    public void init() {
        CheckThat.theEnum("vehicle.Size")
                 .hasEnumElements("SMALL", "LARGE");
    }
}

