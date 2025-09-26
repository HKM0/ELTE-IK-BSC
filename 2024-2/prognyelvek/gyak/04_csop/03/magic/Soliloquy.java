//nagyon hibás xd

package magic;
import magic.library.Incantation;

public class Soliloquy {
    
    public static void reciteIncantations(Incantation inc1, Incantation inc2, int idx, boolean startWithAppend) {
        boolean ret1 = inc1.enchant(inc2, !startWithAppend);
        printStatus(ret1, inc1, inc2);
        inc1.setIndex(idx);

        boolean ret2 = inc1.enchant(inc2, startWithAppend);
        printStatus(ret2, inc1, inc2);

        boolean ret3 = inc1.enchant(inc2, true);
        printStatus(ret3, inc1, inc2);
    }

    private static void printStatus(boolean ret, Incantation inc1, Incantation inc2) {
        System.out.println(ret + ";" + inc1.getIndex() + ";" + inc1.getText()
            + ";" + inc2.getIndex() + ";" + inc2.getText());
    }

    public static void main(String[] args) {
        String text1 = args[0];
        int index1 = Integer.parseInt(args[1]);
        String text2 = args[2];
        int index2 = Integer.parseInt(args[3]);
        int arg5 = Integer.parseInt(args[4]);
        int arg6 = Integer.parseInt(args[5]);

        Incantation inc1 = new Incantation(text1, index1);
        Incantation inc2 = new Incantation(text2, index2);
        Incantation inc3 = new Incantation(inc2);

        reciteIncantations(inc1, inc2, arg5, true);
        inc1.setIndex(arg6);
        reciteIncantations(inc1, inc3, arg5, false);
    }
}
