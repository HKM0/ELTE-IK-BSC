package magic.library;

public class Incantation {
    private String text;
    private int index;

    public Incantation(String text, int index) {
        if (text == null) throw new IllegalArgumentException();
        this.text = text;
        this.index = index;
    }

    public Incantation(Incantation other) {
        this.text = other.text;
        this.index = other.index;
    }

    public String getText() {
        return text;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public boolean enchant(Incantation otherInc, boolean isPrepend) {
        String[] words = text.split("\\s+");
        if (index < 0 || index >= words.length) return false;
        String chosenWord = words[index];
        if (isPrepend) {
            otherInc.text = chosenWord + " " + otherInc.text;
            index--;
        } else {
            otherInc.text = otherInc.text + " " + chosenWord;
            index++;
        }
        return true;
    }
}
