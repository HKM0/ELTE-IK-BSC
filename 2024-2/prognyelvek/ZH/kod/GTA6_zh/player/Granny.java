package player;
import player.util.ItemType;

public class Granny{

    private String name;
    private ItemType item;
    private int level;
    private double money;

    public Granny(String name, ItemType item, int level, double money ){
        this.name = name;
        this.item = item;
        this.level = level;
        this.money = money;
    }

    public String getName(){
        return this.name;
    }
    public ItemType getItem(){
        return this.item;
    }
    public int getLevel(){
        return this.level;
    }
    public double getMoney(){
        return this.money;
    }
    public void setMoney(double money){
        this.money = money;
    }

    @Override
    public int hashCode(){
        int asd = 31*(this.item.hashCode()+this.level+this.name.hashCode()+(int)this.money);
        return asd;
    }
    @Override
    public boolean equals(Object asd){
        if (!(asd instanceof Granny) || asd == null){
            return false;
        }
        Granny g = (Granny) asd;
        if (g.getItem() != this.item || g.getLevel()!= this.level || g.getMoney() != this.money || g.getName() != this.name)
        {
            return false;
        }else
        {
            return true;
        }
    }
}