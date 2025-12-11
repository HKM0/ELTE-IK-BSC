package progress;
import progress.upgrades.Upgrade;
import java.util.*;
import player.Granny;
import progress.upgrades.util.PurchaseException;
import java.util.Map.*;

public class Laboratory{
    private Map<Upgrade,Boolean> upgrades;
    public Laboratory( Upgrade... upgrades){
        for (Upgrade u : upgrades){
            this.upgrades.put(u,false);
        }
    }

    public void purchaseUpgrade(Granny granny, Upgrade upgrade)throws PurchaseException{
        if(this.upgrades.get(upgrade))
        {
            throw new PurchaseException("Upgrade not available!");
        }else if(upgrade.isAffordable(granny)){
            granny.setMoney(granny.getMoney()-upgrade.getPrice());
            Boolean asd = this.upgrades.get(upgrade);
            asd = true;
        }
    }
    public boolean hasPurchasableUpgrade(Granny granny){
        boolean van = false;
        for(Upgrade u : this.upgrades.keySet())
        {   try{
                if (!this.upgrades.get(u)){
                    van = true;
                    break;
                }
            }catch(Exception ex){
                System.out.println(ex);
            }
        }
        return van;
    }

    @Override
    public String toString(){
        String asd = "";
        //Upgrade Speed boost with price: 100.0 - level 5 needed (PURCHASED)
        for(Upgrade u : this.upgrades.keySet()) {
            asd = "Upgrade " + u.getName() + " with price: " + u.getPrice() + " - level " + u.getRequiredLevel() + " needed (";
            if (this.upgrades.get(u)){
                asd= asd +"PURCHASED)";
            }else{
                asd= asd +"AVAILABLE)";
            }
        }
        return asd;
    }
}