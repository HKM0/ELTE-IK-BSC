package interfacedemo;

public class RocketSilo {
    public boolean readyToLaunch = false;

    public void toggleSwitch() {
        this.readyToLaunch = !this.readyToLaunch;
    }
}