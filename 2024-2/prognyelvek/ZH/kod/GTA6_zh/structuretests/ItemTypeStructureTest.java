package structuretests;

import static check.CheckThat.*;
import static check.CheckThat.Condition.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.MethodOrderer.*;
import check.*;

@TestMethodOrder(OrderAnnotation.class)
public class ItemTypeStructureTest {
    @Test
    public void elems() {
        CheckThat.theEnum("player.util.ItemType")
                 .hasEnumElements("CANE", "SLIPPERS", "HAND_BAG");
    }
}

