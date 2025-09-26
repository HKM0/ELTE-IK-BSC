package bagdemo;

import java.util.ArrayList;

public class VarargDemo {
    public ArrayList<Integer> data;

    public VarargDemo(Integer ...ints) {
        this.data = new ArrayList<Integer>();
        for (Integer num : ints) {
            this.data.add(num);
        }

        System.out.println(this.data);
    }

    public static void main(String[] args) {
        VarargDemo demo = new VarargDemo(2, 3, 4, 5);
    }
}