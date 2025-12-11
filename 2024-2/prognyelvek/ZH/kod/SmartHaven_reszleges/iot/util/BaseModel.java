package iot.util;
import iot.device.Category;
import iot.util.IotFunction;
import java.lang.String;
public class BaseModel implements IotFunction{
    protected boolean powerStatus;
    protected String identifier;
    private final Category deviceType;

    //konstruktor
    public BaseModel(String identifier,Category deviceType)throws IllegalArgumentException{ 
        //elfelejtettem hogyan kell string hosszt nézni.
        if (identifier.length() < 3 || identifier == null){
            throw new IllegalArgumentException();
        }else{
            this.powerStatus = false;
            this.identifier=identifier;
            this.deviceType=deviceType;
        }
    }
    //metodusok
    public void turnOn(){
        this.powerStatus=true;
    }
    public void turnOff(){
        this.powerStatus=false;
    }
    public String toggleState(){
        return "BaseModel has no state";
    }

    //getterek és setterek
    public boolean getPowerStatus(){
        return this.powerStatus;
    }
    public String getIdentifier(){
        return this.identifier;
    }
    public Category getDeviceType(){
        return this.deviceType;
    }

    //overrideok
    @Override
    public String toString(){
        return "Device: "+this +", Type: "+this.deviceType+", Identifier: "+this.identifier+", PowerStatus: "+this.powerStatus;
    }

    @Override
    public boolean equals(Object obj){
        BaseModel asd = (BaseModel) obj;
        if (this.getPowerStatus()!=asd.getPowerStatus() || this.getIdentifier()!=asd.getIdentifier()){
            return false;
        }else{
            return true;
        }
    }

    @Override
    public int hashCode(){
        int results=0;
        results += 31*this.identifier.hashCode();
        results += 31*this.deviceType.hashCode();
        return results;
    }
}

