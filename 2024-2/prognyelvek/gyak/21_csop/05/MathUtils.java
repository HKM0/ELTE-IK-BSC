// A simple class for our own implementation of mathematical operations, or exponentiation at the very least
public class MathUtils {
    // Raising an integer to the power of another integer
    public static double power(int base, int exponent) {
        double result = 1; // We initialize the result with 1
        for (int i = 1; i <= Math.abs(exponent); i++) { // We check how many times we want to multiply the base with itself
            result *= base; // and we do so that many times
        }

        // We check for negative exponents
        if (exponent < 0) {
            // In case the base is 0 and the exponent is negative, that would lead to something like 1 / 0^x
            // which is a math error, so we throw an exception
            if (base == 0) {
                throw new IllegalArgumentException();
            }
            result = 1.0 / result; // We calculate the reciprocal
        }

        return result;
    }
}