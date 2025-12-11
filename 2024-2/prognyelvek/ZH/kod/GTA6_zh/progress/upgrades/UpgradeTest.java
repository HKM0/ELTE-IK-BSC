package progress.upgrades;

import static check.CheckThat.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.extension.*;
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import check.*;
import progress.upgrades.util.Purchasable;
import player.Granny;
import player.util.ItemType;


public class UpgradeTest{

    @Test
    public void testUpgradeConstructor(){
        Upgrade u = new Upgrade("a",1.2,1);
        assertEquals(u.getRequiredLevel(),1);
        assertEquals(u.getName(),"a");
        assertEquals(u.getPrice(),1.2);
    } 

    @ParameterizedTest
    @CsvSource(textBlock = """
    asd, 1.2, 1, irén, CANE, 1, 1.2
    asd, 69.2, 10, József, CANE, 11, 69.3
    """)
    public void testIsAffordableSuccess(String uName, double uPrice, int ureqLvl, String name, ItemType item, int lvl, double money){
        Upgrade u = new Upgrade(uName, uPrice, ureqLvl);
        Granny g = new Granny(name, item, lvl, money);
        assertEquals(u.isAffordable(g),true);
    }

}