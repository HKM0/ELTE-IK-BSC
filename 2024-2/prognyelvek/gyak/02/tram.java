public class tram {
    private int MaxPassengerCount;
    private String[] passengers;

    public tram(){

    }

    public tram(int MaxPassengerCount){
        this.MaxPassengerCount = MaxPassengerCount;
        passengers = new String[MaxPassengerCount];
    }

    // getter
    public int getMaxPassengerCount(){
        return MaxPassengerCount;
    }
    public String[] getPassengers(){
        String[] copy = new String[MaxPassengerCount];
        for (int i = 0; i < MaxPassengerCount; i++){
            copy[i] = passengers[i];
        }
        return copy;
    }
    /*
    // setter
    public void setMaxPassengerCount(int MaxPassengerCount){
        this.MaxPassengerCount = MaxPassengerCount;
    }
    public void setPassengers(String[] passengers){
        this.passengers = passengers;
    }
    */

    public void putPassenger(String passengerName, int index){
        passengers[index] = passengerName;
    }
}