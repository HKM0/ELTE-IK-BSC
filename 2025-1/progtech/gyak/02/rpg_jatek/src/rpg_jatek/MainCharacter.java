/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package rpg_jatek;

/**
 *
 * @author herce
 */
public class MainCharacter extends Character{
    protected double defense;
    public MainCharacter(String name, int HP, int attack, double defense){
        super(name, HP, attack);
        this.defense = defense;
    }
    
    @Override
    public void applyDamageFrom(Character character){
        HP -= character.attack / defense;
    }
    
}
