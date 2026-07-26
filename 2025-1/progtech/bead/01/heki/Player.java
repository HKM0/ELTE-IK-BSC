/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;
import java.util.List;
/**
 *
 * @author heki
 */
public class Player {
    protected String name;
    protected Strategy strategy;
    protected int balance;
    protected int position;
    protected List<PropertyField> properties;
    protected boolean active;
    
    public Player(String name, Strategy strategy, int balance, int position, List<PropertyField> properties, boolean active){
        this.name = name;
        this.strategy = strategy;
        this.balance = balance;
        this.position = position;
        this.properties = properties;
        this.active = active;
    }
    public int getBalance(){
        return balance;
    }
    
    public void move(int steps, Board board){
        position = (position + steps) % board.getSize();
    }
    
    /**
     * Kifizet egy osszeget: ha negativ lesz az egyenleg, kiesik a jatekos.
     * @param amount a kifizetendo osszeg
    */
    public void pay(int amount){
        balance-=amount;
        if (balance < 0) {
            active = false;
            System.out.println(name + " kiesett!");
        }
    }
    
    public void receive(int amount){
        balance+=amount;
    }
    
    /**
     * Dontesi algoritmus a vasarlasrol: meghivja a strategiat.
     * @param field a mezo, amirol donteni kell
     * @return ha vasarolni kell true, egyebkent false
    */
    public boolean decidePurchase(PropertyField field){
        return strategy.shouldBuy(this, field);
    }
    public int getPosition(){
        return position;
    }
    public void setPosition(int pos){
        this.position = pos;
    }
    
    public void addProperty(PropertyField prop){
        properties.add(prop);
    }
    public String getname(){
        return name;
    }
    
    public String getName(){
        return name;
    }
    
    public List<PropertyField> getProperties(){
        return properties;
    }
    
    public boolean isActive(){
        return active;
    }
    
    public void setActive(boolean active){
        this.active = active;
    }
}