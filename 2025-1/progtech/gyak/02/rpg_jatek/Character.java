/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package rpg_jatek;

/**
 *
 * @author herce
 */
public class Character {
    protected String name;
    protected int HP;
    protected int attack;
    public Character(String name, int HP, int attack) {
        this.name=name;
        this.HP=HP;
        this.attack=attack;
    }
    public boolean isAlive(){
        return (this.HP>0);
    }
    
    protected void applyDamageFrom(Character character){
        if (this.HP >= character.attack){
            this.HP -=character.attack;
        }else 
        {
            this.HP = 0;
        }
    }
    public void attacked(Character character){
        if (isAlive()){
            appleDamageFrom(character);
        }
    }
    
    public void attack(Character character){
        if (isAlive()){
            character.attacked(this);
        }
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public int getHP(){
        return HP;
    }
    public void setHP(int hp){
        this.HP=hp;
    }
    public int getAttack(){
        return attack;
    }
    public void setAttack(int atk){
        this.attack = atk;
    }
    
   
    
}