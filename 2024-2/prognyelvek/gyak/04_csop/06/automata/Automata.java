package automata;


public class Automata {
    private Node[] nodes;
    private int nodeCount;
    private Edge[] edges;
    private int edgeCount;

    private int state=0;

    // Constructor
    public Automata() {
        nodes = new Node[100];
        edges = new Edge[100];
        nodeCount = 0;
        edgeCount = 0;
    }

    // Add a node to the automata
    public void addNode(String name){
        Node newNode = new Node(name);
        nodes[nodeCount] = newNode;
        nodeCount++;
    }

    // Add an edge to the automata
    public void addEdge(String fromNode, String toNode, EdgeType et) {
        Edge newEdge = new Edge(et, fromNode, toNode);
        edges[edgeCount] = newEdge;
        edgeCount++;
    }

    public void setAcceptingState(String name){
        for (int i = 0; i < nodeCount; i++) {
            if (nodes[i].getName().equals(name)) {
                nodes[i].setAccepting(true);
                return;
            }
        }
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Csucsok:\n");
        for(int i = 0; i < nodeCount; i++) {
            sb.append(nodes[i].toString());
            sb.append("\n");
        }
        sb.append("Elek:\n");
        for(int i = 0; i < edgeCount; i++) {
            sb.append(edges[i].toString());
            sb.append("\n");
        }

        return sb.toString();
    }

    public boolean checkWord(String word) {
        state = 0;
        // Végigiterálunk a szó karakterein
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            boolean foundTransition = false;
            // Keresünk hozzá egy jó élet
            for (int j = 0; j < edgeCount; j++) {
                if (nodes[state].getName().equals(edges[j].getA()) 
                    && edges[j].getEdgeType().equals(String.valueOf(c))) {
                    // Az él B pontja lesz az új állapot: keressük a hozzá tartozó node indexét!
                    for (int k = 0; k < nodeCount; k++) {
                        if (nodes[k].getName().equals(edges[j].getB())) {
                            state = k;
                            foundTransition = true;
                            break;
                        }
                    }
                    if(foundTransition) {
                        break;
                    }
                }
            }
            // Ha nem találtunk megfelelő élet, a szó nem elfogadott
            if (!foundTransition) {
                return false;
            }
        }
        // Ha a végén elfogadó állapotban vagyunk, akkor a szó jó
        System.out.println("Végső állapot: " + state);
        return nodes[state].getIsAccepting();
    }
}