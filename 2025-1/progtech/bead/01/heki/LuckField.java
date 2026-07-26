/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

/**
 *
 * @author heki
 */
public class LuckField extends Field {
    private final int reward;
    
    public LuckField(int index, int reward) {
        this.index = index;
        this.reward = reward;
    }
    
    @Override
    public void onStep(Player player) {
        player.receive(reward);
        System.out.println(player.getName() + " szerencsere lepett: " + reward + " P");
    }
    
    @Override
    public int getIndex() {
        return index;
    }
    
    public int getReward() {
        return reward;
    }
}
