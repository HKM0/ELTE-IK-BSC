package arraylistdemo;

import static check.CheckThat.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.extension.*;
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import check.*;

import java.util.ArrayList;
import java.util.List;

public class ArrayListDemoTest {
    @Test
    public void removeStringsWithSameBeginningAndEndingTest() {
        ArrayList<String> strings = new ArrayList<String>(List.of("ada", "java", "eclipse"));
        ArrayListDemo.removeStringsWithSameBeginningAndEnding(strings);
        assertEquals(new ArrayList<String>(List.of("java")), strings);
    }
}