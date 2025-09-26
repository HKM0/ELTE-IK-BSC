package bagdemo;

import java.util.HashMap;
import java.util.Map.Entry;

public class Bag<T> {
    private HashMap<T, Integer> data;

    public Bag() {
        this.data = new HashMap<T, Integer>();
    }

    public Bag(HashMap<T, Integer> initialData) {
        this.data = new HashMap<T, Integer>(initialData);
    }

    public void put(T elem, Integer count) {
        this.data.put(elem, this.data.getOrDefault(elem, 0) + count);
    }

    public void put(T elem) {
        this.put(elem, 1);
    }

    public Bag<T> intersection(Bag<T> other) {
        HashMap<T, Integer> resultMap = new HashMap<T, Integer>();
        for (Entry<T, Integer> elem : this.data.entrySet()) {
            if (other.data.containsKey(elem.getKey())) {
                resultMap.put(elem.getKey(), elem.getValue() + other.data.get(elem.getKey()));
            }
        }

        Bag<T> retval = new Bag<T>(resultMap);
        return retval;
    }

    public HashMap<T, Integer> getData() {
        return new HashMap<T, Integer>(this.data);
    }
}