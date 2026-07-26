/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package neptun_code;

import java.awt.Color;
import java.awt.Graphics;

/**
 *
 * @author heki
 */
public class Apple {
    private Point position;
    private final int size;

    public Apple(Point position, int size) {
        this.position = position;
        this.size = size;
    }

    public void draw(Graphics g) {
        g.setColor(Color.RED);
        g.fillOval(position.getX() * size, position.getY() * size, size, size);
        g.setColor(Color.GREEN);
        g.fillRect(position.getX() * size + size / 2 - 2, position.getY() * size - 3, 4, 5);
    }

    public Point getPosition() {
        return position;
    }

    public void setPosition(Point position) {
        this.position = position;
    }
}
