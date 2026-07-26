/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

/**
 *
 * @author heki
 */

public class TacticalStrategy implements Strategy {
    private boolean skipNext;
    
    public TacticalStrategy() {
        this.skipNext = false;
    }
    
    /**
     * Taktikai dontes: minden masodik lehetoseget kihagyja.
     * @param player a jatekos, aki donteni fog
     * @param field a mezo, amirol donteni kell
     * @return true, ha vasarolni kell, false kulonben
    */
    @Override
    public boolean shouldBuy(Player player, PropertyField field) {
        boolean isOpportunity = false;
        
        if (field.getOwner() == null && player.getBalance() >= PropertyField.PROPERTY_PRICE) {
            isOpportunity = true;
        } 
        else if (field.getOwner() == player && !field.hasHouse() && 
                   player.getBalance() >= PropertyField.HOUSE_PRICE) {
            isOpportunity = true;
        }
        
        if (!isOpportunity) {
            return false;
        }
        
        if (skipNext) {
            skipNext = false;
            return false;
        } else {
            skipNext = true;
            return true;
        }
    }
}
