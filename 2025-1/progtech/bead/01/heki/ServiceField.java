/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

/**
 *
 * @author heki
 */
public class ServiceField extends Field {
    public static final int SERVICE_FEE = 1000;
    private final int fee;

    public ServiceField(int index, int fee){
        this.index = index;
        this.fee = fee;
    }
    
    public ServiceField(int index){
        this.index = index;
        this.fee = SERVICE_FEE;
    }
    
    @Override
    public void onStep(Player player) {
        player.pay(fee);
        System.out.println(player.getName() + " szolgaltatasi dijat fizetett: " + fee + " P");
    }
    
    @Override
    public int getIndex() {
        return index;
    }
}
