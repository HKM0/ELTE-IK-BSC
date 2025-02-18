/*
 * Készítsen Circle néven kört reprezentáló osztályt. 
 * Egy körnek van középpontja (x és y nevű, double típusú adattag) és sugara (radius).
 * Írjon enlarge(f) metódust, amellyel a kör sugarát f-szeresére változtatja, 
 * illetve getArea() metódust, amely megadja a kör területét. 
 * Használjuk a Math.PI értéket!
*/

public class Circle {
    private double x;
    private double y;
    private double radius;

    public Circle(double x, double y, double radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public void enlarge(double factor) {
        this.radius *= factor;
    }

    public double getArea() {
        return Math.PI * radius * radius;
    }

    //getterek
    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getRadius() {
        return radius;
    }

    // setterek
    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
