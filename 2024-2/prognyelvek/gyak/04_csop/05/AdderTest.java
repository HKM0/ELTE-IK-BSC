import static check.CheckThat.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.extension.*;
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import check.*;

import math.operation.textual.Adder;

public class AdderTest{

    @Test
    public void wrongInput() {
        Adder adder = new Adder();
        assertEquals("Operands are not numbers.", adder.addAsText("53", "abc"));
    }

    @Test
    public void addZero() {
        Adder adder = new Adder();
        assertEquals("0", adder.addAsText("0", "0"));
        assertEquals("0.0", adder.addAsText("0", "0.0"));
        assertEquals("0.0", adder.addAsText("0.0", "0"));
        assertEquals("5.0", adder.addAsText("0.0", "5.0"));
    }

    @Test
    public void add(){
        Adder adder = new Adder();
        assertEquals("53", adder.addAsText("5", "48"));
        assertEquals("53.0", adder.addAsText("5.0", "48"));
        assertEquals("53.0", adder.addAsText("5", "48.0"));
        assertEquals("53.0", adder.addAsText("5.0", "48.0"));
    }

    @Test
    public void addCommutative(){
        Adder adder = new Adder();
        assertEquals(adder.addAsText("5", "48"), adder.addAsText("48", "5"));
        assertEquals(adder.addAsText("5.0", "48"), adder.addAsText("48", "5.0"));
        assertEquals(adder.addAsText("5", "48.0"), adder.addAsText("48.0", "5"));
        assertEquals(adder.addAsText("5.0", "48.0"), adder.addAsText("48.0", "5.0"));
    }

}