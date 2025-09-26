package hashmapdemo;

import static check.CheckThat.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.extension.*;
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import check.*;

import java.util.HashMap;

public class HashMapDemoTest {
    @Test
    public void testPut() {
        HashMapDemo multiSet = new HashMapDemo();
        multiSet.put("asd");
        HashMap<String, Integer> expected = new HashMap<String, Integer>();
        expected.put("asd", 1);
        assertEquals(expected, multiSet.getData());
    }
}