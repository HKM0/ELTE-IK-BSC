/**
 * @author Falesz
 * @version 1.0
 * @since 1.0
 */

// javadoc -d doc TrafficLight.java
// Specifying a destination folder is advised

public class TrafficLight {
    /**
     * <p>The current color of the traffic light.</p>
     */
    public Color currentColor;

    /**
     * <p>Initializes the initial signal of the lamp.</p>
     * @param initColor initial signal from the Color type
     * @since 1.0
     */
    public TrafficLight(Color initColor) {
        this.currentColor = initColor;
    }

    /**
     * <p>Gives the user an instruction on what to do at the traffic light.</p>
     * @since 1.0
     */
    public void giveSignal() {
        if (this.currentColor == Color.GREEN) {
            System.out.println("Go now");
        }
        else if (this.currentColor == Color.YELLOW) {
            System.out.println("Hurry up");
        }
        else if (this.currentColor == Color.RED) {
            System.out.println("Stop");
        }
    }
}