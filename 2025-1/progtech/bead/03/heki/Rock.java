/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package neptun_code;

import java.awt.Color;
import java.awt.Graphics;

/**
 * @author heki
 */
public class Rock {
    private Point position;
    private final int size;

    public Rock(Point position, int size) {
        this.position = position;
        this.size = size;
    }

    public void draw(Graphics g) {
        g.setColor(new Color(139, 69, 19));
        g.fillRect(position.getX() * size, position.getY() * size, size, size);
        g.setColor(Color.BLACK);
        g.drawRect(position.getX() * size, position.getY() * size, size, size);
    }

    public Point getPosition() {
        return position;
    }
}
