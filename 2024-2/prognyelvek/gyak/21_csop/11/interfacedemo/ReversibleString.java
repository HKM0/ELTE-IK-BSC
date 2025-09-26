package interfacedemo;

public class ReversibleString implements Reversible, OtherInterface {
    public String str = "hello";
    
    public void reverse() {
        char[] reversed = this.str.toCharArray();

        for (int i = 0; i < this.str.length(); ++i) {
            reversed[i] = this.str.charAt(this.str.length() - i - 1);
        }
        System.out.println(reversed);
    }
}