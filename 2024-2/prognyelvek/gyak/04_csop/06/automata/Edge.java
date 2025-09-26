package automata;

public class Edge {
    private EdgeType edgeType;
    private String a;
    private String b;

    // Constructor

    public Edge(EdgeType edgeType, String a, String b) {
        this.edgeType = edgeType;
        this.a = a;
        this.b = b;
    }

    //Getter
    public String getA() {
        return a;
    }
    public String getB() {
        return b;
    }

    public String getEdgeType() {
        return edgeType.toString();
    }

    @Override
    public String toString() {
        return "Edge[" + edgeType + "," + a + "," + b + "]";
    }
}