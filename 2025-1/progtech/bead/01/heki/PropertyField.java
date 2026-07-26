/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

/**
 *
 * @author heki
 */

public class PropertyField extends Field {
    public static final int PROPERTY_PRICE = 1000;
    public static final int HOUSE_PRICE = 4000;
    public static final int RENT_NO_HOUSE = 500;
    public static final int RENT_WITH_HOUSE = 2000;
    
    private Player owner;
    private boolean hasHouse;

    public PropertyField(int index){
        this.index = index;
        this.hasHouse=false;
        this.owner = null;
    }
    
    public Player getOwner(){
        return owner;
    }
    public void setOwner(Player player){
        this.owner = player;
    }
    public boolean hasHouse(){
        return hasHouse;
    }
    public void setHouse(boolean existential){
        this.hasHouse = existential;
    }
    
    public void buy(Player player){
        if (this.owner == null && player.getBalance() >= PropertyField.PROPERTY_PRICE)
        {
            player.pay(PropertyField.PROPERTY_PRICE);
            this.owner = player;
            player.addProperty(this);
        }
    }
    
    public void buildHouse(Player player){
        if (this.owner==player && !this.hasHouse && player.getBalance() >= PropertyField.HOUSE_PRICE){
            player.pay(PropertyField.HOUSE_PRICE);
            this.hasHouse=true;
        }
    }
    
    public void chargeRent(Player player){
        if (this.owner != null && this.owner != player){
            if (this.hasHouse) {
                player.pay(PropertyField.RENT_WITH_HOUSE);
                this.owner.receive(PropertyField.RENT_WITH_HOUSE);
            } else {
                player.pay(PropertyField.RENT_NO_HOUSE);
                this.owner.receive(PropertyField.RENT_NO_HOUSE);
            }
        }
    }
    
    /**
     * Vegrehajtja a mezo logikat: vasarlas, epites vagy dij fizetes.
    */
    @Override
    public void onStep(Player player){
        if (this.owner == null) {
            // nincs tulaj -> strat dontes
            if (player.decidePurchase(this)) {
                buy(player);
                System.out.println(player.getName() + " ingatlant vasarolt: " + this.index);
            }
        } else if (this.owner == player) {
            // tulaj -> epit strat dontes
            if (!this.hasHouse && player.decidePurchase(this)) {
                buildHouse(player);
                System.out.println(player.getName() + " hazat epitett: " + this.index);
            }
        } else {
            chargeRent(player);
            if (this.hasHouse) {
                System.out.println(player.getName() + " dijat fizetett "+ this.RENT_WITH_HOUSE+"-t "+this.getOwner().getName()+"-nek");
            } else {
                System.out.println(player.getName() + " dijat fizetett "+ this.RENT_NO_HOUSE+"-t "+this.getOwner().getName()+"-nek");
            }
        }
    }
    
    @Override
    public int getIndex(){
        return index;
    }
        
}
