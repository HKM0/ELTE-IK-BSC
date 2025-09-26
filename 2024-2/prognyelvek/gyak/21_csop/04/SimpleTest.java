
import static org.junit.Assert.assertEquals; // Don't use static imports if you can avoid them
import static org.junit.Assert.assertTrue; // They can easily lead to name conflicts or make the code harder to read
import static org.junit.Assert.fail; // Since this program is short and simple, it's fine for now
import org.junit.Test;

public class SimpleTest {
  // assertTrue will throw an exception if the logical expression is false. This unit test will be successful.
  @Test
  public void testTrue() {
    assertTrue(1 == 1);
  }

  // assertFalse will throw an exception if the logical expression is true. This unit test will be successful.
  @Test
  public void testFalse() {
    assertTrue(0 == 1);
  }

  // If no exceptions are thrown, the unit test is successful.
  @Test
  public void manualSuccess() {
    return;
  }

  // The fail() method will make the unit test unsuccessful if it gets executed at any point. This unit test will fail.
  @Test
  public void manualFail() {
    fail("Always fails");
    assertTrue(1 == 1);
  }

  // In this unit test, an exception occurs that is not caught and handled. This unit test will fail.
  @Test
  public void testUnexpectedException() {
    throw new RuntimeException("Varatlan hiba tortent");
  }

  // The expected field can be set to some exception that we anticipate. If it gets thrown, the unit test will be successful.
  @Test(expected = RuntimeException.class)
  public void testExpectedException() {
    throw new RuntimeException("Varakozasnak megfelelo hiba tortent");
  }

  // This demonstrates several things.
  // We try to run a faulty calculation that should result in an ArithmeticException.
  // We expect it to be thrown, AND then we catch and handle it. This results in no unhandled exceptions and
  // the unit test will be successful, since we catch and handle the exception thrown in the try block.
  // In case some magic happens or a solar flare hits our computer and the ArithmeticException is NOT thrown,
  // we call and execute the fail() method. Since our program should theoretically never ever reach the fail()
  // method call, we know that if it DOES somehow reach it, there has been an error.
  // In this test, we know that 3/0 will always throw an ArithmeticException, but when you are testing your
  // own, much more complicated methods, this is not always obvious and you may want to call the fail() method
  // if you absolutely want your method to throw an exception beforehand in some cases.
  @Test
  public void testExpectedException2() {
    try{
      int x = 3/0;
      fail("Nem tortent kivitel");
    } catch(ArithmeticException e){}
  }

  // In this test, we try the same thing but don't catch it. This results in an unhandled ArithmeticException,
  // but since we are expecting this in our unit test, this will also be successful.
  @Test (expected = ArithmeticException.class)
  public void testExpectedException3() {
    int x = 3/0;
  }

  // If you want to test for infinite loops or methods that take unacceptably long to execute,
  // you may fail the unit test by setting up a timeout. This test will fail after running for 2 seconds (2000 milliseconds).
  @Test(timeout=2000)
  public void abortWhenInfiniteLoop(){
    while(true){}
  }

  @Test
  public void assertExample() {
    int expectedResult = 8; // the expected result of a fictional calculation
    int actualResult = 16; // the actual result of the fictional calculation
    
    // The entire code below would work similarly to an assertEquals() method call
    /*
    if (expectedResult == actualResult) {
      // successful test case
    }
    else {
      throw new RuntimeException("A kapott érték nem egyezik a várt értékkel");
    }
    */

    // The code above would act sufficiently for testing purposes, but it's clunky and unnecessary
    // We can substitute this long code with the useful and convenient assertEquals() method
    assertEquals(expectedResult, actualResult, 0.1); // this gives us proper information during testing and is much shorter
  }
}

/*
Windows:

```
javac -cp .;junit-4.12.jar;hamcrest-core-1.3.jar SimpleTest.java
java -cp .;junit-4.12.jar;hamcrest-core-1.3.jar org.junit.runner.JUnitCore SimpleTest
```

Linux:

```
javac -cp .:junit-4.12.jar:hamcrest-core-1.3.jar SimpleTest.java
java -cp .:junit-4.12.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore SimpleTest
```
*/