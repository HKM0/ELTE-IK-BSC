package iot.device;

import iot.device.Category;
import iot.util.UnSupportedDevice;
import java.util.*;
import iot.util.BaseModel;

public class ActionDevice extends BaseModel{
    private final HashMap<String,String> actions;
    private String lastAction;
    public ActionDevice(String identifier,Category deviceType) throws UnSupportedDevice{
        if (identifier==""){
            throw new UnSupportedDevice("asd");
        }
        this.lastAction="None";
    }
    
    public HashMap<String, String> getActions(){
        return this.actions;
    }

    public String getLastAction(){
        return this.lastAction;
    }

    public void addAction(String actionType, String details){
        //ötletem sincs ezt hogyan kezdeném el így hirtelen
    }

    public String getAvailableActions(){
        String asd="";
        for (Entry a : actions.values()){
            asd=asd+a.getValue();
        }
        if (asd == ""){
            return "No actions available";
        }else{
            return asd;
        }
    }

    public String performAction(String actionType){
        if (actions.containsValue(actionType)){
            return "Performed: "+actionType;
        }else{
            return "Unknown action: "+actionType;
        }
    }

    public String toggleState(){
        return "";
    }







}