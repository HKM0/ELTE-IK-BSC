package parking;
import parking.facility.Space;
import java.lang.String;
import vehicle.Size;

public class ParkingLot{
    //------------------------------
    //parkolo lista
    //------------------------------
    private final Space[][] floorPlan;

    //------------------------------
    //parkolo epuletterv getter
    //------------------------------
    public Space[][] getFloorPlan(){
        return floorPlan;
    }

    //------------------------------
    //sorbol utolso space torles
    //------------------------------
    private static String sorszerkeszto(String sor){
        if (sor!=null && sor.charAt(sor.length()-1) == ' '){
            return sor.substring(0, sor.length()-1);
        }else{
            return sor;
        }
    }


    //------------------------------
    //konstruktor
    //------------------------------
    public ParkingLot(int floorNumber, int spaceNumber){
        if (floorNumber < 1 || spaceNumber < 1){
            throw new IllegalArgumentException("nem lehet kevesebb mint 1");
        }
        floorPlan = new Space[floorNumber][spaceNumber];
        for (int i = 0; i < floorNumber; i++){
            for (int j = 0; j< spaceNumber; j++){
                floorPlan[i][j] = new Space(i,j);
            }
        }
    }
    public String toString(){
        String out = "";
        for (int i = 0; i< floorPlan.length; i++){
            String sor = "";
            for (int j = 0; j< floorPlan[i].length; j++){
                Space hely = floorPlan[i][j];
                if (!hely.isTaken()){
                    sor += "X ";
                }else{
                    Size meret = hely.getOccupyingCarSize();
                    if (meret == Size.SMALL){
                        sor += "S ";
                    }else if (meret == Size.LARGE){
                        sor += "L ";
                    }
                }
            }
            out = sorszerkeszto(sor)+"\n"+out;
        }
        return out;
    }   
}


