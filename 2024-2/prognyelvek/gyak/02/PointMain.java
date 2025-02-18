public class PointMain{
    public static void main(String[] args) {
        Point p1 = new Point(1,1);
        Point p2 = new Point(2,2);
        System.out.println(p1.toString());
        System.out.println(p2);
        p1.move(1,1.5);
        p2.move(2,2);
        System.out.println(p1);
        System.out.println(p2);
        //eltolas egy P_e vel
        Point P_e = new Point(100, 500.555);
        p1.move(P_e);
        System.out.println(p1);

    }
}
