public class Szintaxis {
    public static void main(String[] args) {
      // print line funkció: 
      System.out.println("Ez egy sor.");

      // egy sorba így írhatunk: 
      System.out.println("Szia uram! ");
      System.out.print("Bojler eladó!");

      // számokat így írhatunk:
      System.out.println(1);

      // műveleteket így írhatunk bele: 
      System.out.println((10+13)*3);

      // így hozhatunk létre egész számos változót:
      int bojler = 99;

      // így írhatjuk felül az értéket:
      bojler = 20;
      System.out.println(bojler);
      
      // If-else szerkezet
      if (bojler > 5) {
          System.out.println("Nagyobb mint 5");
      } else {
          System.out.println("Nem nagyobb mint 5");
      }

      // For ciklus
      for (int i = 0; i < 3; i++) {
          System.out.println("Ciklus: " + i);
      }

      // Tömb és bejárása
      int[] tomb = {1, 2, 3};
      for (int elem : tomb) {
          System.out.println("Tömb elem: " + elem);
      }
      
    }
  }

