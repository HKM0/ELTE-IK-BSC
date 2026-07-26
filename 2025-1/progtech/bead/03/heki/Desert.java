/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package neptun_code;

import java.awt.Color;
import java.awt.Graphics;
import java.util.ArrayList;
import java.util.Random;

/**
 *
 * @author heki
 */
public class Desert {
    private final int width;
    private final int height;
    private final int cellSize;
    private ArrayList<Rock> rocks;
    private Snake snake;
    private Apple apple;
    private Random random;

    public Desert(int width, int height, int cellSize) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.random = new Random();
        this.rocks = new ArrayList<>();
    }

    public void initializeGame() {
        int centerX = width / cellSize / 2;
        int centerY = height / cellSize / 2;
        
        int[] directions = {0, 1, 2, 3};
        int randomDir = directions[random.nextInt(4)];
        
        snake = new Snake(centerX, centerY, cellSize);
        
        switch(randomDir) {
            case 0:
                snake.setDirection(1, 0);
                break;
            case 1:
                snake.setDirection(-1, 0);
                break;
            case 2:
                snake.setDirection(0, 1);
                break;
            case 3:
                snake.setDirection(0, -1);
                break;
        }
        
        generateRocks(centerX, centerY);
        spawnApple();
    }

    private void generateRocks(int snakeX, int snakeY) {
        rocks.clear();
        int numRocks = 15 + random.nextInt(11);
        
        for (int i = 0; i < numRocks; i++) {
            Point rockPos = getRandomEmptyPosition(snakeX, snakeY);
            if (rockPos != null) {
                rocks.add(new Rock(rockPos, cellSize));
            }
        }
    }

    private Point getRandomEmptyPosition(int snakeX, int snakeY) {
        int maxAttempts = 100;
        for (int i = 0; i < maxAttempts; i++) {
            int x = random.nextInt(width / cellSize);
            int y = random.nextInt(height / cellSize);
            Point pos = new Point(x, y);
            
            if (Math.abs(x - snakeX) <= 2 && Math.abs(y - snakeY) <= 2) {
                continue;
            }
            
            if (snake != null && snake.contains(pos)) {
                continue;
            }
            
            if (apple != null && apple.getPosition().equals(pos)) {
                continue;
            }
            
            boolean rockExists = false;
            for (Rock rock : rocks) {
                if (rock.getPosition().equals(pos)) {
                    rockExists = true;
                    break;
                }
            }
            
            if (!rockExists) {
                return pos;
            }
        }
        return null;
    }

    public void spawnApple() {
        Point applePos = getRandomEmptyPosition(-1, -1);
        if (applePos != null) {
            apple = new Apple(applePos, cellSize);
        }
    }

    public void draw(Graphics g) {
        g.setColor(new Color(237, 201, 175));
        g.fillRect(0, 0, width, height);
        
        for (Rock rock : rocks) {
            rock.draw(g);
        }
        
        if (apple != null) {
            apple.draw(g);
        }
        
        if (snake != null) {
            snake.draw(g);
        }
    }

    public Snake getSnake() {
        return snake;
    }

    public Apple getApple() {
        return apple;
    }

    public boolean checkCollisionWithRock(Point position) {
        for (Rock rock : rocks) {
            if (rock.getPosition().equals(position)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkCollisionWithWall(Point position) {
        int x = position.getX();
        int y = position.getY();
        return x < 0 || x >= width / cellSize || y < 0 || y >= height / cellSize;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public int getCellSize() {
        return cellSize;
    }
}
