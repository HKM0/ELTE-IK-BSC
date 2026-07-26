/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

import java.awt.BorderLayout;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.GridLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import javax.swing.BorderFactory;
import javax.swing.JOptionPane;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.JMenuBar;

/**
 *
 * @author heki
 */
public class JatekTabla {
    private JatekLogika logika;
    private JButton[][] gomb;
    private JPanel tabla;
    private JFrame frame; 

    public void start() {
        frame = new JFrame("Lovagi Torna");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        menuLetrehoz();
        ujJatek();

        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }

    private void menuLetrehoz() {
        JMenuBar menuBar = new JMenuBar();
        frame.setJMenuBar(menuBar);
        JMenu gameMenu = new JMenu("Játék");
        menuBar.add(gameMenu);
        JMenuItem newGameItem = new JMenuItem("Új Játék");
        gameMenu.add(newGameItem);
        newGameItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                ujJatek();
            }
        });
    }

    public void ujJatek() {
        String[] opciok = new String[]{"4x4", "6x6", "8x8"};
        int valasztas = JOptionPane.showOptionDialog(frame, "Válassz méretet:", "Új játék", JOptionPane.DEFAULT_OPTION, JOptionPane.PLAIN_MESSAGE, null, opciok, opciok[0]);
        int n = 4;
        if (valasztas == 1) n = 6;
        else if (valasztas == 2) n = 8;
        ujJatek(n);
    }

    void ujJatek(int n) {
        logika = new JatekLogika(n);
        
        if (tabla != null) {
            frame.getContentPane().remove(tabla);
        }
        createBoard();
        frame.pack();
        frame.revalidate();
        frame.repaint();
    }

    private void createBoard() {
        int n = logika.getN();

        tabla = new JPanel(new GridLayout(n, n));
        gomb = new JButton[n][n];
        Dimension buttonSize = new Dimension(80, 80);
        Font buttonFont = new Font("Arial", Font.BOLD, 24);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                gomb[i][j] = new JButton();
                gomb[i][j].setPreferredSize(buttonSize);
                gomb[i][j].setFont(buttonFont);
                gomb[i][j].setOpaque(true);
                gomb[i][j].setBorder(BorderFactory.createLineBorder(Color.DARK_GRAY));
                gomb[i][j].addActionListener(new LepesKezelo(i, j, this, logika));
                tabla.add(gomb[i][j]);
            }
        }
        frame.getContentPane().add(tabla, BorderLayout.CENTER);
        updateAllButtons();
    }

    public void updateAllButtons() {
        int n = logika.getN();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                updateButton(i, j);
            }
        }
    }

    private void updateButton(int i, int j) {
        JButton b = gomb[i][j];
        String txt = "";
        Lovag lovagMezo = logika.getLovagAt(i, j);
        int aktivJatekosSzin = (logika.getAktivJatekos() == 0) ? 1 : 2;

        if (lovagMezo != null) {
            if (lovagMezo.szin == 1) {
                txt="W";
            }else {
                txt="B";
            }
        }
        b.setText(txt);

        int tablaSzin = logika.getTabla()[i][j];
        if (tablaSzin == 0) {
            b.setBackground(Color.GRAY);
            b.setForeground(Color.BLACK);
        } else if (tablaSzin == 1) {
            b.setBackground(Color.WHITE);
            b.setForeground(Color.BLACK);
        } else {
            b.setBackground(Color.BLACK);
            b.setForeground(Color.WHITE);
        }

        if (lovagMezo != null) {
            if (lovagMezo == logika.getKivalasztottLovag()) {
                b.setBorder(BorderFactory.createLineBorder(Color.CYAN, 4));
            } else if (lovagMezo.szin == aktivJatekosSzin) {
                b.setBorder(BorderFactory.createLineBorder(Color.GREEN, 4));
            } else {
                b.setBorder(BorderFactory.createLineBorder(Color.DARK_GRAY));
            }
        } else {
            if (logika.getKivalasztottLovag() != null && logika.szabalyosLepes(logika.getKivalasztottLovag(), i, j)) {
                b.setBorder(BorderFactory.createLineBorder(Color.YELLOW, 2));
            } else {
                b.setBorder(BorderFactory.createLineBorder(Color.DARK_GRAY));
            }
        }
    }

    public JFrame getFrame() {
        return frame;
    }
}
