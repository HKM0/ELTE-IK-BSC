package iot.util;
import java.lang.Exception;

public class UnSupportedDevice extends Exception{
    public UnSupportedDevice(String asd){
        super(asd);
    }
}