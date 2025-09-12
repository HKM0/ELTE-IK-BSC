/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package students;

/**
 *
 * @author herce
 */
import java.util.*;
class Hallgato {
    private String nev;
    private String nemzetiseg;
    private double atlag;

    public Hallgato(String nev, String nemzetiseg, double atlag) {
        this.nev = nev;
        this.nemzetiseg = nemzetiseg;
        this.atlag = atlag;
    }

    public String getNev() { return nev; }
    public void setNev(String nev) { this.nev = nev; }

    public String getNemzetiseg() { return nemzetiseg; }
    public void setNemzetiseg(String nemzetiseg) { this.nemzetiseg = nemzetiseg; }

    public double getAtlag() { return atlag; }
    public void setAtlag(double atlag) { this.atlag = atlag; }
}

public class Students {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<Hallgato> hallgatok = new ArrayList<>();

        System.out.print("Hany hallgatot szeretnel felvenni? ");
        int n = Integer.parseInt(sc.nextLine());
        for (int i = 0; i < n; i++) {
            System.out.println((i+1) + ". hallgato:");
            System.out.print("Nev: ");
            String nev = sc.nextLine();
            System.out.print("Nemzetiseg: ");
            String nemzetiseg = sc.nextLine();
            System.out.print("Atlag: ");
            
            double atlag = -1.0;
            while ( atlag == -1.0){
                try{
                    atlag = Double.parseDouble(sc.nextLine());
                }
                catch(NumberFormatException e){
                    System.out.print("Nem jo erteket adtal meg!\nAtlag: ");
                }
            }
            hallgatok.add(new Hallgato(nev, nemzetiseg, atlag));
        }

        // Legjobb és legrosszabb átlag
        if (!hallgatok.isEmpty()) {
            Hallgato legjobb = hallgatok.get(0);
            Hallgato legrosszabb = hallgatok.get(0);
            for (Hallgato h : hallgatok) {
                if (h.getAtlag() > legjobb.getAtlag()) legjobb = h;
                if (h.getAtlag() < legrosszabb.getAtlag()) legrosszabb = h;
            }
            System.out.println("Legjobb atlag: " + legjobb.getNev() + " (" + legjobb.getAtlag() + ")");
            System.out.println("Legrosszabb atlag: " + legrosszabb.getNev() + " (" + legrosszabb.getAtlag() + ")");
        }

        // Ösztöndíjasok
        System.out.println("Osztondijas hallgatok:");
        boolean vanOsztondijas = false;
        for (Hallgato h : hallgatok) {
            if (h.getAtlag() >= 4.0) {
                System.out.println(h.getNev() + " (" + h.getAtlag() + ")");
                vanOsztondijas = true;
            }
        }
        if (!vanOsztondijas) {
            System.out.println("Nincs osztondijas hallgato.");
        }
    }
}
