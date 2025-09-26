public class Main {
    public static void main(String[] args) {
        // Color color = new Color(); // compile time error, enum types can not be instantiated

        TrafficLight light1 = new TrafficLight(Color.GREEN);
        light1.giveSignal();
        light1.currentColor = Color.RED;
        light1.giveSignal();
    }
}