/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

/**
 *
 * @author heki
 */

public class JatekLogika {
    private int n;
    private int[][] tabla;
    private Lovag[] lovagok;
    private int aktivJatekos;
    private Lovag kivalasztottLovag;

    public JatekLogika(int meret) {
        this.n = meret;
        jatekBetolt();
    }

    public void jatekBetolt() {
        tabla = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                tabla[i][j] = 0; 
            }
        }
        lovagok = new Lovag[4];
        lovagok[0] = new Lovag(0, 0, 1); 
        lovagok[1] = new Lovag(n - 1, 0, 2); 
        lovagok[2] = new Lovag(n - 1, n - 1, 1); 
        lovagok[3] = new Lovag(0, n - 1, 2); 

        for (Lovag k : lovagok) {
            tabla[k.x][k.y] = k.szin;
        }

        aktivJatekos = 0;
        kivalasztottLovag = null;
    }

    public int getN() {
        return n;
    }

    public int[][] getTabla() {
        return tabla;
    }

    public int getAktivJatekos() {
        return aktivJatekos;
    }

    public Lovag getKivalasztottLovag() {
        return kivalasztottLovag;
    }

    public void setKivalasztottLovag(Lovag lovag) {
        this.kivalasztottLovag = lovag;
    }

    public void kovetkezoJatekos() {
        this.aktivJatekos = 1 - this.aktivJatekos;
    }

    public boolean aktivJatekosLovag(int r, int c) {
        int aktivJatekosSzin = (aktivJatekos == 0 ? 1 : 2);
        for (Lovag k : lovagok) {
            if (k.x == r && k.y == c && k.szin == aktivJatekosSzin) {
                return true;
            }
        }
        return false;
    }

    public boolean szabalyosLepes(Lovag k, int tx, int ty) {
        int dx = Math.abs(tx - k.x);
        int dy = Math.abs(ty - k.y);
        boolean paripaLepes = (dx == 2 && dy == 1) || (dx == 1 && dy == 2);
        if (!paripaLepes) {
            return false;
        }
        for (Lovag masikLovag : lovagok) {
            if (masikLovag.x == tx && masikLovag.y == ty) {
                return false;
            }
        }
        return true;
    }

    public boolean vanNyertes(int szin) {
        // vizszintesen
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= n - 4; j++) {
                if (tabla[i][j] == szin && tabla[i][j + 1] == szin && tabla[i][j + 2] == szin && tabla[i][j + 3] == szin)
                    return true;
            }
        }
        // fuggolegesen
        for (int j = 0; j < n; j++) {
            for (int i = 0; i <= n - 4; i++) {
                if (tabla[i][j] == szin && tabla[i + 1][j] == szin && tabla[i + 2][j] == szin && tabla[i + 3][j] == szin)
                    return true;
            }
        }
        // atlosan
        for (int i = 0; i <= n - 4; i++) {
            for (int j = 0; j <= n - 4; j++) {
                if (tabla[i][j] == szin && tabla[i + 1][j + 1] == szin && tabla[i + 2][j + 2] == szin && tabla[i + 3][j + 3] == szin)
                    return true;
            }
        }
        // atlosan ellenkezoleg
        for (int i = 0; i <= n - 4; i++) {
            for (int j = 3; j < n; j++) {
                if (tabla[i][j] == szin && tabla[i + 1][j - 1] == szin && tabla[i + 2][j - 2] == szin && tabla[i + 3][j - 3] == szin)
                    return true;
            }
        }
        return false;
    }

    public boolean tablaTele() {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (tabla[i][j] == 0)
                    return false;
            }
        }
        return true;
    }

    public Lovag getLovagAt(int x, int y) {
        for (Lovag k : lovagok) {
            if (k.x == x && k.y == y) {
                return k;
            }
        }
        return null;
    }

    public void lovagMozog(Lovag knight, int x, int y) {
        int winnerColor = (aktivJatekos == 0) ? 1 : 2;
        tabla[knight.x][knight.y] = winnerColor;
        knight.x = x;
        knight.y = y;
        tabla[x][y] = winnerColor; 
    }
}

