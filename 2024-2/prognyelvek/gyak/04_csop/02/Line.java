public class Line{
    private double a,b,c;

    public Line(double a, double b, double c){
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public boolean contains(Point p){
        return a*p.getX() + b*p.getY() - c == 0;
    }
}