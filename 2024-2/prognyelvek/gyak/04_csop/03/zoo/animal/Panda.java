package zoo.animal;

public class Panda {
    //adattagok
    private String name;
    private int age;
    private String country;

    public Panda(String name, String country) {  //új konstruktor
        this.name = name;
        this.age = 0;
        this.country = country;
    }
    public Panda(int age, String country) {  //új konstruktor
        this.name = age + " éves Panda tesó" + country;
        this.age = age;
        this.country = country;
    }

    public void happyBirthday(int limitYear){
        this.age++;
        if (this.age >= limitYear){
            this.country = "Kínai népköztársaság";
        } else {
            System.out.println(this);
        }
        System.out.println();
    }
    @Override
    public String toString() {
        return "Panda: " + name + "(" + age + " years old) from " + country;
    }

    public void eat() {
        System.out.println("Panda bro bambuszt rágcsál");
    }

    public void sleep() {
        System.out.println("Fuckin' panda sleepin'");
    }

    public void play() {
        System.out.println("Panda éppen játszik, magával");
    }

    public void introduce() {
        System.out.println("név: skibidi " + name + ", kor: " + age + ", ország: " + country);
    }

    public int getAge() {
        return age;
    }
}