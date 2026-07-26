/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

/**
 *
 * @author heki
 */
public class GreedyStrategy implements Strategy{
    /**
     * Moho dontes: mindig vasarol, ha van ra penze.
     * @param player a jatekos, aki donteni fog
     * @param field a mezo, amirol donteni kell
     * @return ha vasarolni kell true, egyebkent false
    */
    @Override
    public boolean shouldBuy(Player player, PropertyField field){
            //nincs tulaj, van penz -> vasarol
        if(field.getOwner() == null && player.getBalance() >= PropertyField.PROPERTY_PRICE){
            return true;
        } else 
            // jatekose, nincs tulaj, van penz -> epit
            if (field.getOwner() == player && !field.hasHouse() && player.getBalance() >= PropertyField.HOUSE_PRICE){
            return true;
        } else{
            return false;
        }
    }
}
