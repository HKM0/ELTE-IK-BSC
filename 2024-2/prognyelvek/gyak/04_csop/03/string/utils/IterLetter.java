package string.utils;

public class IterLetter {
    private final String text;
    private int index = 0;

    public IterLetter(String text) {
        if (text == null) {
            throw new IllegalArgumentException("Nem lehet üres");
        }
        this.text = text;
    }

    public void printNext() {
        if (index < text.length()) {
            System.out.println(text.charAt(index++));
        } else {
            System.out.println();
        }
    }

    public void reset() {
        index = 0;
    }

    public boolean hasNext() {
        return index < text.length();
    }
}
