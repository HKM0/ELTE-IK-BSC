/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

import java.util.List;

/**
 *
 * @author heki
 */
public class Board {
    private final List<Field> fields;

    public Board(List<Field> fields){
        this.fields = fields;
    }
    
    public Field getField(int position){
        return fields.get(position % fields.size());
    }    
    
    public int getSize() {
        return fields.size();
    }    
}

