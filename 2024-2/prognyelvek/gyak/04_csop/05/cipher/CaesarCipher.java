package cipher;
 
public class CaesarCipher {
    private int shift;
 
    public CaesarCipher(int shift) {
        this.shift = shift;
    }
 
    public String decrypt(String text) {
        return "";
    }
 
    public String encrypt(String text) {
        String result = "";
        for(int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            //Ha nem betű, akkor hagyjuk meg
            if(!('a' <= c && c <= 'z')){
                result += c;
            }
            else {
                //Eltolom,és ha túlment akkor visszateszem az intervallumba
                c = (char) (c + shift);
                if(c > 'z'){
                    c = (char) (c - (char)('z' - 'a' + 1));
                }
                if (c < 'a'){
                    c = (char) (c + (char)('z' - 'a' + 1));
                }
                result += c;
            }
        }
        return result;
    }
    //TESZT
    public static void main(String[] args) {
        CaesarCipher cc = new CaesarCipher(-1);
        System.out.println(cc.encrypt("aabcz"));
    }
}