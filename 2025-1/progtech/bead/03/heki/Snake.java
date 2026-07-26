/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package neptun_code;

import java.awt.Color;
import java.awt.Graphics;
import java.util.ArrayList;

/**
 *
 * @author heki
 */
public class Snake {
    private ArrayList<Point> body;
    private int directionX;
    private int directionY;
    private final int size;
    private boolean growing;

    public Snake(int startX, int startY, int size) {
        this.size = size;
        body = new ArrayList<>();
        body.add(new Point(startX, startY));
        body.add(new Point(startX - 1, startY));
        directionX = 1;
        directionY = 0;
        growing = false;
    }

    public void draw(Graphics g) {
        for (int i = 0; i < body.size(); i++) {
            Point segment = body.get(i);
            if (i == 0) {
                g.setColor(new Color(0, 150, 0));
            } else {
                g.setColor(new Color(0, 200, 0));
            }
            g.fillRect(segment.getX() * size, segment.getY() * size, size, size);
            g.setColor(Color.BLACK);
            g.drawRect(segment.getX() * size, segment.getY() * size, size, size);
        }
    }

    public void move() {
        Point head = body.get(0);
        Point newHead = new Point(head.getX() + directionX, head.getY() + directionY);
        body.add(0, newHead);
        
        if (!growing) {
            body.remove(body.size() - 1);
        } else {
            growing = false;
        }
    }

    public void setDirection(int dx, int dy) {
        if (directionX + dx != 0 || directionY + dy != 0) {
            directionX = dx;
            directionY = dy;
        }
    }

    public void grow() {
        growing = true;
    }

    public Point getHead() {
        return body.get(0);
    }

    public boolean collidesWithSelf() {
        Point head = getHead();
        for (int i = 1; i < body.size(); i++) {
            if (head.equals(body.get(i))) {
                return true;
            }
        }
        return false;
    }

    public boolean contains(Point point) {
        for (Point segment : body) {
            if (segment.equals(point)) {
                return true;
            }
        }
        return false;
    }

    public ArrayList<Point> getBody() {
        return body;
    }

    public int getLength() {
        return body.size();
    }
}
