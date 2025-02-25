package string.utils.main;

import string.utils.IterLetter;

public class Main {
    public static void main(String[] args) {
        if (args.length < 4) {
            System.out.println("Használat: java Main <count1> <text> <count2> <count3>");
            return;
        }

        int count1 = Integer.parseInt(args[0]);
        String text = args[1];
        int count2 = Integer.parseInt(args[2]);
        //int count3 = Integer.parseInt(args[3]);

        IterLetter iterLetter = new IterLetter(text);

        for (int i = 0; i < count1; i++) {
            iterLetter.printNext();
        }

        System.out.println("Van következő elem a visszaállítás előtt: " + iterLetter.hasNext());
        iterLetter.reset();
        System.out.println("Van következő elem a visszaállítás után: " + iterLetter.hasNext());

        for (int i = 0; i < count2; i++) {
            iterLetter.printNext();
        }

        System.out.println("Van következő elem a vég előtt: " + iterLetter.hasNext());
    }
}