/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package rpg_jatek;

/**
 *
 * @author herce
 */
public abstract class Dragon extends Character{
    protected final int ATTACK_THRESHOLD;
    
    public Dragon(String name, int HP, int attack, int ATTACK_THRESHOLD){
        super(name, HP, attack);
        this.ATTACK_THRESHOLD=ATTACK_THRESHOLD;
    }
    
    @Override
    public void applyDamageFrom(Character character){
        if (character.attack > ATTACK_THRESHOLD){
            this.HP -=character.attack;
        }
    }
}
