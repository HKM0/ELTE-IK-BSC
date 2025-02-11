public class main2 {
    public static void Main(String[] args){
        if (args.length !=1) {
            System.out.println("Nem csaptál nekem argumentumot");
            return;
        }
        int n = Integer.parseInt(args[0]);
        int osszeg = 0;
        for (int i = 1; i<n; i++){
            if (n%i==0) {
                osszeg+=i;
            }
        }
        if (osszeg==n){
            System.out.println("tokeletes");
        }

    }
}