import static check.CheckThat.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.*;
import org.junit.jupiter.api.extension.*;
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import check.*;
import famous.sequence.*;

public class FibonacciTest{

    //Alapesetek
    @Test
    public void testZero() {
        assertEquals(0, Fibonacci.fib(0));
    }
    @Test
    public void testOne() {
        assertEquals(1, Fibonacci.fib(1));
    }

    //10ik
    @Test
    public void testTen() {
        assertEquals(55, Fibonacci.fib(10));
    }
}