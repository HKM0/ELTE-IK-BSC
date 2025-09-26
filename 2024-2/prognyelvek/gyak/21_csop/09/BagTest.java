package bagdemo;

import static check.CheckThat.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.extension.*;
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import check.*;

import java.util.HashMap;

public class BagTest {
    @Test
    public void putTest1() {
        Bag<Boolean> bag = new Bag<Boolean>();
        bag.put(new Boolean(true), 3);
        bag.put(new Boolean(false), 2);

        HashMap<Boolean, Integer> expected = new HashMap<Boolean, Integer>();
        expected.put(new Boolean(true), 3);
        expected.put(new Boolean(false), 2);

        assertEquals(expected, bag.getData());
    }

    @Test
    public void putTest2() {
        Bag<Boolean> bag = new Bag<Boolean>();
        bag.put(new Boolean(true));
        bag.put(new Boolean(true));
        bag.put(new Boolean(false));

        HashMap<Boolean, Integer> expected = new HashMap<Boolean, Integer>();
        expected.put(new Boolean(true), 2);
        expected.put(new Boolean(false), 1);

        assertEquals(expected, bag.getData());
    }

    @Test
    public void intersectionTest() {
        Bag<String> bag1 = new Bag<String>();
        bag1.put("asd", 3);
        bag1.put("bab", 2);
        bag1.put("dab");

        Bag<String> bag2 = new Bag<String>();
        bag2.put("asd", 2);
        bag2.put("bab");
        bag2.put("bop");

        HashMap<String, Integer> expectedData = new HashMap<String, Integer>();
        expectedData.put("asd", 5);
        expectedData.put("bab", 3);

        assertEquals(expectedData, bag1.intersection(bag2).getData());
    }
}