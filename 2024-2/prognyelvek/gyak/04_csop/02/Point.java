public class Point {
    private double x;
    private double y;

    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public void move(Point p) {
        this.x += p.x;
        this.y += p.y;
    }

    public void move(double dx, double dy) {
        this.x += dx;
        this.y += dy;
    }

    public void mirror(double cx, double cy) {
        this.x = 2 * cx - this.x;
        this.y = 2 * cy - this.y;
    }

    public String toString() {
        return "Point(" + "x=" + x + ", y=" + y + ')';
    }

    public double distance(Point p) {
        double dx = this.x - p.x;
        double dy = this.y - p.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
