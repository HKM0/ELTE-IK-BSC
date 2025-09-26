// A representation of a point
class Point {
    // Fields
    // Assume only positive x values are valid
    private double x; // A private variable or method can only be accessed by instances of this class
    private double y;

    // Methods
    // A public variable or method can be accessed by all other classes and methods
    public void move(double dx, double dy) {
        x = x + dx; // x += dx if you want to be fancy
        y = y + dy;
    }

    public void mirror(double cx, double cy) {
        double dx = 2 * (cx - x);
        double dy = 2 * (cy - y);
        /* x += dx;
        y += dy; */
        move(dx, dy);
    }

    public void mirror(Point other) {
        double dx = 2 * (other.getX() - this.x);
        double dy = 2 * (other.getY() - this.y);
        this.move(dx, dy);
    }

    // Getters
    // Getters or other methods consisting of a single instruction may be written in a single line altogether
    // to make the code a bit more compact and easy to read. Ultimately this is up to your preference.
    public double getX() { return x; }
    public double getY() { return y; }

    // Setters
    // Assuming only positive x values are valid, you need to protect your class field from invalid assignments
    // A colleague of yours working on another file may not be 100% well informed on how your Point class works
    // and may not be aware that only positive x values are valid.
    // To prevent them from assigning invalid values to your x field, you may set it to private so that
    // other programs can not touch it and mess it up. You can hand out a public setter method which can be used instead
    // to assign new values to the field and here it is possible for you to perform a validation of the new value.
    public void setX(double newX) {
        if (newX > 0) { // We check if the new value is indeed a positive integer
            x = newX; // If it is, we execute the assignment
        }
        // If it isn't, we disregard it. To make this more sophisticated, we may throw an exception here,
        // but this is a more advanced tool and will be discussed in detail later during the semester.
    }

    public void setY(double newY) {
        y = newY;
    }
}