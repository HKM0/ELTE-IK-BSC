public class Tokeletes {

    private static boolean TokeletesE(int n){
        int osszeg=0;
        for(int i = 1; i < n; i++) {
            if(n%i==0)
                osszeg+=i;
        }
        if(osszeg==n)
            return true;
        else
            return false;
    }
    public static void main(String[] args) {
        
        //Hibakezelés
        if(args.length != 1) {
            System.out.println("Nem megfelelő a paraméterek száma!");
            return;
        }

        //Parse
        int n = Integer.parseInt(args[0]);

        //Logika - vajon tökéletes?
        

        //Kiírom az eredményt
        if(TokeletesE(n))
            System.out.println("Igen");
        else
            System.out.println("Nem");
    }
}