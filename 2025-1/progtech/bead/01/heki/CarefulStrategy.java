/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

/**
 *
 * @author heki
 */
public class CarefulStrategy implements Strategy {
    
    /**
     * Ovatos dontes: csak akkor vasarol, ha az osszeg max az egyenleg fele.
     * @param player a jatekos, aki donteni fog
     * @param field a mezo, amirol donteni kell
     * @return ha vasarolni kell true, egyebkent false
    */
    @Override
    public boolean shouldBuy(Player player, PropertyField field) {
        if (field.getOwner() == null) {
            return player.getBalance() >= PropertyField.PROPERTY_PRICE && 
                   PropertyField.PROPERTY_PRICE <= player.getBalance() / 2;
        } else if (field.getOwner() == player && !field.hasHouse()) {
            return player.getBalance() >= PropertyField.HOUSE_PRICE && 
                   PropertyField.HOUSE_PRICE <= player.getBalance() / 2;
        }
        return false;
    }
}
