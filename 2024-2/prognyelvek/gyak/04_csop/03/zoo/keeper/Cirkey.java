package zoo.keeper;

import zoo.animal.Panda;

public class Cirkey {
    static public void main(String[] args){
        Panda panda = new Panda("Xing Hui", "China"); //konstruktor hívás
        panda.happyBirthday(10);
        System.out.println(panda.getAge());
        System.out.println(panda);
        panda.sleep();
    }
    
}
