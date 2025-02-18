public class Complex {
    private double real;
    private double imaginary;

    public Complex(double real, double imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    public Complex conjugate() {
        return new Complex(this.real, -this.imaginary);
    }

    public Complex reciprocate() {
        double scale = real * real + imaginary * imaginary;
        return new Complex(real / scale, -imaginary / scale);
    }

    public Complex div(Complex c) {
        return this.multiply(c.reciprocate());
    }

    public Complex multiply(Complex c) {
        double realPart = this.real * c.real - this.imaginary * c.imaginary;
        double imaginaryPart = this.real * c.imaginary + this.imaginary * c.real;
        return new Complex(realPart, imaginaryPart);
    }

    public String toString() {
        return "komplex(" + "valós=" + real + ", képzetes=" + imaginary + ')';
    }
}
