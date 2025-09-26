package automata;

public class Node{
    private String name;
    private boolean isAccepting;

    // Constructor

    public Node(String name) {
        this.name = name;
        this.isAccepting = false;
    }

    //Legyen ő egy elfogadó állapot
    public void setAccepting(boolean isAccepting) {
        this.isAccepting = isAccepting;
    }

    //getName
    public String getName() {
        return name;
    }

    //getIsAccepting
    public boolean getIsAccepting() {
        return isAccepting;
    }

    @Override
    public String toString() {
        return "Node[" + name + "," + isAccepting + "]";
    }
}