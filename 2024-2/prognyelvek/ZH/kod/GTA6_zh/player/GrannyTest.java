package player;

import static check.CheckThat.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.extension.*;
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import check.*;
import player.Granny;
import player.util.ItemType;

public class GrannyTest{

    @Test
    public void testGrannyConstructor(){
        Granny g = new Granny("a",ItemType.CANE, 1, 2.2);
        assertEquals(g.getName(),"a");
        assertEquals(g.getItem(), ItemType.CANE);
        assertEquals(g.getLevel(), 1);
        assertEquals(g.getMoney(), 2.2);
    } 

    @ParameterizedTest
    @CsvSource(textBlock = """
        "asd", "asd", CANE, CANE, 1, 1, 2.2, 2.2, false
        "szia", "uram", CANE, HAND_BAG, 1, 2, 2.2, 3.3, false
    """)
    public void testGrannyEqualityCheck(String n1, String n2, ItemType i1, ItemType i2, int l1, int l2, double d1, double d2, boolean expBool){
        Granny g1 = new Granny(n1, i1, l1, d1);
        Granny g2 = new Granny(n2, i2, l2, d2);
        assertEquals(g1.equals(g2), expBool);
    }
}