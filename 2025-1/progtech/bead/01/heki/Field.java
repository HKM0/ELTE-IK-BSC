/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

/**
 *
 * @author heki
 */
public abstract class Field {
    protected int index;
    
    public abstract int getIndex();
    public abstract void onStep(Player player);
}

