package interfacedemo;

public class LightSwitch implements ControlPanel {
    public boolean lightIsOn = false;
    public void toggleSwitch() {
        this.lightIsOn = !this.lightIsOn;
    }
}