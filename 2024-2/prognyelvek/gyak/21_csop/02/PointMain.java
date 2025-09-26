// A program to demonstrate some of the features of the Point class
class PointMain {
    public static void main(String[] args) {
        Point p = new Point();
        System.out.println("P point: (" + p.getX() + ", " + p.getY() + ")");

        // p.x = -3;
        // Note that the above comment may be written as source code by someone who is not aware
        // that we only like positive integers assigned to the field x of our class. Since we
        // set it to private in our class, such a mistake would now not be possible, as it would
        // result in a compile time error instead.

        p.setX(-3); // This is safe, since we validate the argument of the setter and handle it appropriately
        p.setX(3);
        p.setY(1);
        System.out.println("P point: (" + p.getX() + ", " + p.getY() + ")");

        p.move(1, 1);
        System.out.println("P point: (" + p.getX() + ", " + p.getY() + ")");
    }
}