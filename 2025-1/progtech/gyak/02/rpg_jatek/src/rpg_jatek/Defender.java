/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package rpg_jatek;

/**
 *
 * @author herce
 */
public class Defender extends Orc{
    public Defender(String name, int HP, int attack){
        super(name, HP, attack);
    }
    
    
    
    @Override
    public void applyDamageFrom(Character character){
        this.HP -= character.attack / 2;
    }
}
