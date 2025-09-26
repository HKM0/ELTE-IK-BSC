import automata.*;

public class Main {
    public static void main(String[] args) {
        Automata automata = new Automata();
        automata.addNode("q1");
        automata.addNode("q2");
        automata.addNode("q3");
        automata.addNode("qw");
        automata.addEdge("q1", "q2", EdgeType.a);
        automata.addEdge("q2", "q3", EdgeType.b);
        automata.addEdge("q3", "q3", EdgeType.a);
        automata.addEdge("q3", "q3", EdgeType.b);
        automata.addEdge("q1", "qw", EdgeType.b);
        automata.addEdge("q2", "qw", EdgeType.a);
        automata.addEdge("qw", "qw", EdgeType.a);
        automata.addEdge("qw", "qw", EdgeType.b);

        automata.setAcceptingState("q3");


        System.out.println(automata.toString());
        //Elfogad minden olyant, ami ab prefix
        System.out.println(automata.checkWord("ab"));
        System.out.println(automata.checkWord("aab"));
        System.out.println(automata.checkWord("aba"));
        System.out.println(automata.checkWord("abbb"));
        System.out.println(automata.checkWord("abaababa"));

        System.out.println(automata.checkWord("a"));
        System.out.println(automata.checkWord("b"));
        System.out.println(automata.checkWord("aa"));
        System.out.println(automata.checkWord("bb"));
        System.out.println(automata.checkWord("ba"));
    }
}