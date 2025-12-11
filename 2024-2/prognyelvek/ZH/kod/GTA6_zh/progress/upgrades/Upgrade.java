package progress.upgrades;
import progress.upgrades.util.Purchasable;
import player.Granny;

public class Upgrade implements Purchasable{
    private String name;
    private double price;
    private int requiredLevel;

    public Upgrade(String name, double price, int requiredLevel){
        this.name = name;
        this.price = price;
        this.requiredLevel = requiredLevel;
    }

    public int getRequiredLevel(){
        return this.requiredLevel;
    }
    public String getName(){
        return this.name;
    }
    public double getPrice(){
        return this.price;
    }

    public boolean isAffordable(Granny granny){
        if (granny.getMoney()>=this.price && granny.getLevel()>=this.requiredLevel){
            return true;
        }else{
            return false;
        }
    }
}