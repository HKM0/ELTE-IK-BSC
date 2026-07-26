/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package neptun_code;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.AbstractAction;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.KeyStroke;
import javax.swing.Timer;

/**
 *
 * @author heki
 */
public class Game extends JFrame {
    
    private final int WINDOW_WIDTH = 800;
    private final int WINDOW_HEIGHT = 600;
    private final int CELL_SIZE = 20;
    private final int FPS = 10;
    
    private Desert desert;
    private GamePanel gamePanel;
    private Timer gameTimer;
    private Timer clockTimer;
    private boolean gameOver;
    private int score;
    private long startTime;
    private JLabel scoreLabel;
    private JLabel timeLabel;
    private HighScores highScores;
    
    public Game() {
        setTitle("Sneky Snek - HEKI");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);
        
        try {
            highScores = new HighScores(10);
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(this, 
                "Nem sikerült kapcsolódni az adatbázishoz!\n", 
                "Adatbázis hiba", 
                JOptionPane.ERROR_MESSAGE);
        }
        
        createMenuBar();
        createStatusPanel();
        
        gamePanel = new GamePanel();
        add(gamePanel, BorderLayout.CENTER);
        
        setupKeyBindings();
        
        pack();
        setLocationRelativeTo(null);
        setVisible(true);
        
        startNewGame();
    }
    
    private void createMenuBar() {
        JMenuBar menuBar = new JMenuBar();
        
        JMenu gameMenu = new JMenu("Játék");
        JMenuItem newGameItem = new JMenuItem("Új játék");
        newGameItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                startNewGame();
            }
        });
        gameMenu.add(newGameItem);
        
        JMenuItem exitItem = new JMenuItem("Kilépés");
        exitItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
        gameMenu.add(exitItem);
        
        JMenu scoresMenu = new JMenu("Eredmények");
        JMenuItem viewScoresItem = new JMenuItem("Top 10");
        viewScoresItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                showHighScores();
            }
        });
        scoresMenu.add(viewScoresItem);
        
        menuBar.add(gameMenu);
        menuBar.add(scoresMenu);
        
        setJMenuBar(menuBar);
    }
    
    private void createStatusPanel() {
        JPanel statusPanel = new JPanel();
        statusPanel.setPreferredSize(new Dimension(WINDOW_WIDTH, 30));
        statusPanel.setBackground(Color.LIGHT_GRAY);
        
        scoreLabel = new JLabel("Pontszám: 0");
        scoreLabel.setFont(new Font("Arial", Font.BOLD, 14));
        
        timeLabel = new JLabel("Idő: 00:00");
        timeLabel.setFont(new Font("Arial", Font.BOLD, 14));
        
        statusPanel.add(scoreLabel);
        statusPanel.add(new JLabel("     "));
        statusPanel.add(timeLabel);
        
        add(statusPanel, BorderLayout.SOUTH);
    }
    
    private void setupKeyBindings() {
        gamePanel.getInputMap().put(KeyStroke.getKeyStroke("W"), "up");
        gamePanel.getActionMap().put("up", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent ae) {
                if (!gameOver && desert.getSnake() != null) {
                    desert.getSnake().setDirection(0, -1);
                }
            }
        });
        
        gamePanel.getInputMap().put(KeyStroke.getKeyStroke("S"), "down");
        gamePanel.getActionMap().put("down", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent ae) {
                if (!gameOver && desert.getSnake() != null) {
                    desert.getSnake().setDirection(0, 1);
                }
            }
        });
        
        gamePanel.getInputMap().put(KeyStroke.getKeyStroke("A"), "left");
        gamePanel.getActionMap().put("left", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent ae) {
                if (!gameOver && desert.getSnake() != null) {
                    desert.getSnake().setDirection(-1, 0);
                }
            }
        });
        
        gamePanel.getInputMap().put(KeyStroke.getKeyStroke("D"), "right");
        gamePanel.getActionMap().put("right", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent ae) {
                if (!gameOver && desert.getSnake() != null) {
                    desert.getSnake().setDirection(1, 0);
                }
            }
        });
    }
    
    private void startNewGame() {
        if (gameTimer != null) {
            gameTimer.stop();
        }
        if (clockTimer != null) {
            clockTimer.stop();
        }
        
        gameOver = false;
        score = 0;
        startTime = System.currentTimeMillis();
        updateScoreLabel();
        updateTimeLabel();
        
        desert = new Desert(WINDOW_WIDTH, WINDOW_HEIGHT, CELL_SIZE);
        desert.initializeGame();
        
        gameTimer = new Timer(1000 / FPS, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (!gameOver) {
                    gameLoop();
                }
            }
        });
        gameTimer.start();
        
        clockTimer = new Timer(1000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                updateTimeLabel();
            }
        });
        clockTimer.start();
        
        gamePanel.requestFocusInWindow();
    }
    
    private void gameLoop() {
        Snake snake = desert.getSnake();
        snake.move();
        
        Point head = snake.getHead();
        
        if (desert.checkCollisionWithWall(head)) {
            endGame();
            return;
        }
        
        if (desert.checkCollisionWithRock(head)) {
            endGame();
            return;
        }
        
        if (snake.collidesWithSelf()) {
            endGame();
            return;
        }
        
        Apple apple = desert.getApple();
        if (apple != null && head.equals(apple.getPosition())) {
            snake.grow();
            score++;
            updateScoreLabel();
            desert.spawnApple();
        }
        
        gamePanel.repaint();
    }
    
    private void endGame() {
        gameOver = true;
        gameTimer.stop();
        clockTimer.stop();
        
        String playerName = JOptionPane.showInputDialog(this, 
            "Játék vége! A pontszámod: " + score + "\nAdd meg a neved:", 
            "Játék vége", 
            JOptionPane.PLAIN_MESSAGE);
        
        if (playerName != null && !playerName.trim().isEmpty() && highScores != null) {
            try {
                highScores.putHighScore(playerName.trim(), score);
                JOptionPane.showMessageDialog(this, 
                    "Az eredmény mentve!", 
                    "Siker", 
                    JOptionPane.INFORMATION_MESSAGE);
            } catch (SQLException ex) {
                Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
                JOptionPane.showMessageDialog(this, 
                    "Nem sikerült menteni az eredményt!", 
                    "Hiba", 
                    JOptionPane.ERROR_MESSAGE);
            }
        }
    }
    
    private void showHighScores() {
        if (highScores == null) {
            JOptionPane.showMessageDialog(this, 
                "Nincs kapcsolat az adatbázissal!", 
                "Hiba", 
                JOptionPane.ERROR_MESSAGE);
            return;
        }
        
        try {
            ArrayList<HighScore> scores = highScores.getHighScores();
            StringBuilder sb = new StringBuilder();
            sb.append("Top 10 eredmények:\n\n");
            
            for (int i = 0; i < scores.size(); i++) {
                HighScore hs = scores.get(i);
                sb.append(String.format("%d. %s - %d pont\n", i + 1, hs.getName(), hs.getScore()));
            }
            
            if (scores.isEmpty()) {
                sb.append("Még nincsenek eredmények!");
            }
            
            JOptionPane.showMessageDialog(this, 
                sb.toString(), 
                "Legjobb eredmények", 
                JOptionPane.INFORMATION_MESSAGE);
        } catch (SQLException ex) {
            Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
            JOptionPane.showMessageDialog(this, 
                "Hiba az eredmények lekérdezése közben!", 
                "Hiba", 
                JOptionPane.ERROR_MESSAGE);
        }
    }
    
    private void updateScoreLabel() {
        scoreLabel.setText("Pontszám: " + score);
    }
    
    private void updateTimeLabel() {
        long elapsed = (System.currentTimeMillis() - startTime) / 1000;
        long minutes = elapsed / 60;
        long seconds = elapsed % 60;
        timeLabel.setText(String.format("Idő: %02d:%02d", minutes, seconds));
    }
    
    class GamePanel extends JPanel {
        public GamePanel() {
            setPreferredSize(new Dimension(WINDOW_WIDTH, WINDOW_HEIGHT));
            setBackground(Color.BLACK);
            setFocusable(true);
        }
        
        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            if (desert != null) {
                desert.draw(g);
            }
        }
    }
    
    public static void main(String[] args) {
        new Game();
    }
}
