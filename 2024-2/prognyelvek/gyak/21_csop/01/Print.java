// Original source code
/* class Print {
    public static void main() {
        for( int i = 1; i < 4; i++ ) {
            System.out.Println(i/2);
        }
        i = 4;
        System.out.println("Kiirtam " + i + " szamot")
    }
} */

// You found all of these issues during lab01, congrats
// 1-től 4-ig kiírjuk a számok felét
class Print {
    public static void main(String[] args) { // argumentumok tömbjének hozzáadása
        for( int i = 1; i <= 4; i++ ) { // egyenlőség megengedése
            System.out.println(i/2.0); // println kisbetűvel kezdve
        }
        int i = 4; // deklaráljuk az i változót
        System.out.println("Kiirtam " + i + " szamot"); // hiányzó semicolon
    }
}