public class Main{
    public static void main(String[] args){
        //Thread worldThread = new Thread(() ->{
        //    for (int i = 0; i<10_000; i++){
        //        System.out.println("World ");
        //    }
        //});
        //worldThread.starts();
        
        Thread helloThread = new HelloThread("valami");
        helloThread.start();
    }
}
 
//feladat: megadott szoveget kiirni betunkent
class HelloThread extends Thread {
    private String text = "asd";
    public HelloThread(String text){
        super();
        this.text = text;
    }
   
    @Override
    public void run(){
        int a = this.text.length();
        for (int i = 0; i<a; i++){
            System.out.println(this.text.charAt(i));
        }
    }
}