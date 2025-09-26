import org.junit.Assert; // For most of the semester, we will need these two classes from JUnit
import org.junit.Test;

// In this code we will write unit tests for our MathUtils.power() method. In object oriented programming
// we have very well separated functions that can be tested for unwanted behavior and correct results
// as single units. For instance, we now have a single method in our program that raises an integer
// to the power of another integer. We want to test if it works correctly in all expected cases.
// What happens if we raise a positive number to the power of another positive number?
// What happens if we raise 0 to the power of a positive number?
// What happens if we raise 0 to the power of a negative number?
// What happens if we raise a negative number to the power of another negative number?
// What else could occur in a fictional main program that we need to test for?
// These are all questions we have to ask when creating unit tests for our methods.

// We can write unit tests in 3 main steps:
// 1) We think, ponder and wonder about what we expect of our method under different circumstances and
// we try to figure out all the possible circumstances that our method can actually be called under.

// 2) We calculate or determine an expected result under all those circumstances.
// For instance, if we call our method like MathUtils.power(2, 3), we expect the result to be 8.
// If we call our method like MathUtils.power(1, 5), we expect the result to be 1.
// If we call our method like MathUtils.power(0, -2), we expect an ArithmeticException to be thrown.
// It is important to be thorough at this stage and find all the different scenarios in which
// we want our method to work properly, according to expectations and without errors.

// 3) We write our unit tests as shown below and run our test program. Testing is successful if all unit tests
// are successful. Unit tests are successful if no unexpected exceptions have occured during execution. We have tools in the
// Assert class of JUnit that can help us easily identify cases in which our method produces unintended
// or faulty behavior. This testing program will heavily feature the assertEquals() method, but other
// useful tools are also available. You can check these out in SimpleTest.java.

// This is a testing program for our MathUtils class
// Note that the name of the class and file that contain our unit tests do not have to be named
// in this manner, but it's nice and straightforward to name our test program like MyProgramTest
public class MathUtilsTest {
    public static final double EPSILON = 0.1; // This is an epsilon that will determine how much
                                              // offset from our expected result is allowed for the unit
                                              // tests to still be counted as successful.

    // Our most basic case of using the MathUtils.power() method.
    // What happens if we raise a positive integer to the power of a positive integer?
    @Test
    public void raisePosToPos() {
        // We use the Assert.assertEquals() method for this unit test. This expects 3 parameters:
        // the expected result, the result we actually get and the epsilon for allowed margins of error.
        // We know our method SHOULD return 8 if we use it to raise 2 to the power of 3.
        // In order to achieve this knowledge, some pen and paper may be unavoidable when you are working
        // with more complicated programs. Maths is important.
        // To contrast this worrying development, note that unit tests do not need to be overly complicated.
        // Testing for 2^3 is functionally the same as testing for 5^4. Neither of these calculations are difficult,
        // but why choose the harder one when the easier one works the same way?
        Assert.assertEquals(8.0, MathUtils.power(2, 3), EPSILON);
    }

    // What happens if we raise 1 to the power of a positive integer?
    @Test
    public void raiseOneToPos() {
        // Note that unit tests may have more executable code than just simple assertions.
        // This is often useful if you need multiple objects that interact with each other,
        // or if you want to set up some specific environment for your objects before testing
        // for their behaviors.
        MathUtils myMaths = new MathUtils();
        Assert.assertEquals(1.0, myMaths.power(1, 5), EPSILON);
    }

    // What happens if we raise 0 to the power of a positive integer?
    @Test
    public void raiseZeroToPos() {
        Assert.assertEquals(0.0, MathUtils.power(0, 5), EPSILON);
    }

    // What happens if we raise a positive integer to the power of a negative integer?
    @Test
    public void raisePosToNeg() {
        Assert.assertEquals(0.25, MathUtils.power(2, -2), EPSILON);
    }

    // What happens if we raise a positive integer to the power of 0?
    @Test
    public void raisePosToZero() {
        Assert.assertEquals(1.0, MathUtils.power(3, 0), EPSILON);
    }

    // What happens if we raise 0 to the power of a negative integer?
    @Test (expected = IllegalArgumentException.class)
    public void raiseZeroToNeg() {
        // Note that the use of methods from the Assert class are not required at all for unit testing
        // They are just tools that make our work easier. See the assertExample test case in
        // SimpleTest.java for an explicit example of this.
        MathUtils.power(0, -2);
    }
}

// It is recommended that you use a standard shell or commandline that your operating system provides to
// compile and run test programs. The way to compile and run this program on Windows is:
/*
javac -classpath .;junit-4.12.jar;hamcrest-core-1.3.jar MathUtilsTest.java
java -classpath .;junit-4.12.jar;hamcrest-core-1.3.jar org.junit.runner.JUnitCore MathUtilsTest
*/

// On Linux you need to change the delimiter character:
/*
javac -classpath .:junit-4.12.jar:hamcrest-core-1.3.jar MathUtilsTest.java
java -classpath .:junit-4.12.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore MathUtilsTest
*/
