import java.util.HashMap;

// HashMap documentation:
// https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html

// Represents a multiset or bag containing Strings
public class MultiSet {
    private HashMap<String, Integer> data;

    public MultiSet() {
        this.data = new HashMap<String, Integer>();
    }

    public MultiSet(HashMap<String, Integer> initialData) {
        // this.data = initialData; // this would mean we assign the initialData reference to this.data, which would
                                    // instantly leak the contents of this class to the outside by providing
                                    // a fictional main program a way to reach and manipulate this.data
        this.data = new HashMap<String, Integer>(initialData); // we create a brand new HashMap with the initial data, this is safe
    }

    public HashMap<String, Integer> getData() {
        // return this.data; // same mistake as above
        return new HashMap<String, Integer>(this.data);
    }

    public void put(String str) { // this is the put() method of our own MultiSet class
        if (this.data.containsKey(str)) {
            Integer mult = this.data.get(str) + 1;
            this.data.replace(str, mult);
        }
        else {
            this.data.put(str, 1); // this is the put() method of the HashMap class provided by Java
        }
    }

    // TODO
    /* public MultiSet intersect(MultiSet other) {
        // Multiset result ...
 
        // keySet()
        // for (String key : this.data.keySet())

        // Math.min(Integer int1, Integer int2)

        // return result;
    } */
}