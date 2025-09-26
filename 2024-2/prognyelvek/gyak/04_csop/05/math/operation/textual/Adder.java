package math.operation.textual;

 
public class Adder{
    public String addAsText(String a, String b){
        try{
            Integer an = Integer.parseInt(a);
            Integer bn = Integer.parseInt(b);
            Integer sum = an + bn;
            return sum.toString();
        }catch(Exception e){
            try{
            double an = Double.parseDouble(a);
            double bn = Double.parseDouble(b);
            Double sum = an + bn;
            return sum.toString();
            }catch(Exception f){
                return "Operands are not numbers.";
            }
        }
    }

    public static void main(String[] args) {
        Adder adder = new Adder();
        System.out.println(adder.addAsText("5", "3")); // Output: 53
        System.out.println(adder.addAsText("5.5", "3.2")); // Output: 5.53.2
        System.out.println(adder.addAsText("abc", "3")); // Output: Operands are not numbers.
    }
}