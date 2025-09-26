package hashmapdemo;

import java.util.HashMap;

public class HashMapDemo {
    private HashMap<String, Integer> data;

    public HashMapDemo() {
        this.data = new HashMap<String, Integer>();
    }

    public HashMapDemo(HashMap<String, Integer> initialData) {
        this.data = new HashMap<String, Integer>(initialData);
    }

    public void put(String str) {
        if (!data.containsKey(str)) {
            data.put(str, 1);
        }
        else {
            data.put(str, data.get(str) + 1);
        }
    }

    public HashMap<String, Integer> getData() {
        return new HashMap<String, Integer>(this.data);
    }
}