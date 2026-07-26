/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JOptionPane;

/**
 *
 * @author heki
 */
public class LepesKezelo implements ActionListener {
    private final int x, y;
    private final JatekTabla tabla;
    private final JatekLogika logika;

    public LepesKezelo(int x, int y, JatekTabla tabla, JatekLogika logika) {
        this.x = x;
        this.y = y;
        this.tabla = tabla;
        this.logika = logika;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        Lovag kivalasztottLovag = logika.getKivalasztottLovag();
        
        if (kivalasztottLovag == null) {
            if (logika.aktivJatekosLovag(x, y)) {
                logika.setKivalasztottLovag(logika.getLovagAt(x, y));
            }
        } else {
            if (kivalasztottLovag.x == x && kivalasztottLovag.y == y) {
                logika.setKivalasztottLovag(null);
            } else if (logika.aktivJatekosLovag(x, y)) {
                logika.setKivalasztottLovag(logika.getLovagAt(x, y));
            } else if (logika.szabalyosLepes(kivalasztottLovag, x, y)) {
                int aktivJatekos = logika.getAktivJatekos();
                int nyertesSzin;
                if (aktivJatekos == 0){
                    nyertesSzin = 1;
                } else {
                    nyertesSzin = 2;
                }
                
                logika.lovagMozog(kivalasztottLovag, x, y);

                if (logika.vanNyertes(nyertesSzin)) {
                    tabla.updateAllButtons();
                    String nyertes;
                    if (nyertesSzin == 1) {
                        nyertes = "Fehér";
                    } else {
                        nyertes = "Fekete";
                    }
                    JOptionPane.showMessageDialog(tabla.getFrame(), nyertes + " nyert!");
                    tabla.ujJatek();
                    return;
                } else if (logika.tablaTele()) {
                    tabla.updateAllButtons();
                    JOptionPane.showMessageDialog(tabla.getFrame(), "Döntetlen, a tábla megtelt!");
                    tabla.ujJatek();
                    return;
                } else {
                    logika.kovetkezoJatekos();
                }
                logika.setKivalasztottLovag(null);
            } else {
                logika.setKivalasztottLovag(null);
            }
        }
        tabla.updateAllButtons();
    }
}
