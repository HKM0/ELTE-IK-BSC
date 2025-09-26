public class Auto {
    public int ulesDb=0;
    public String rendszam="";

    public Auto(String rendszam, int ulesDb) {
        this.rendszam = rendszam;
        this.ulesDb = ulesDb;
    }

    public void PrintTuTu() {
        //System.out.println("TuTu");
        System.out.println(rendszam);
    }
}