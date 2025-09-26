package famous.sequence;

public class Fibonacci {
    public static int fib(int n) {
        if(n<0){
            throw new IllegalArgumentException("n must be greater than or equal to 0");
        }
        if(n==0){
            return 0;
        }
        if(n==1){
            return 1;
        }
        return fib(n-1) + fib(n-2);
    }
}