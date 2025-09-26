package inheritancedemo;

import java.util.ArrayList;

public class Zoo {
    private ArrayList<Animal> animals;

    public Zoo() {
        this.animals = new ArrayList<Animal>();
        this.animals.add(new Tiger(3, 40, 4, 180));
        this.animals.add(new Snake(5, 20, 5, VenomType.NONEXISTENT));
        this.animals.add(new Tiger(10, 40, 3, 160));
        this.animals.add(new Snake(5, 20, 10, VenomType.DANGEROUS_TO_PREY_ANIMALS));
    }

    @Override
    public String toString() {
        StringBuilder zooString = new StringBuilder();
        zooString.append("The animals in the Zoo are:\n");
        for (int i = 0; i < this.animals.size(); ++i) {
            zooString.append(this.animals.get(i).toString() + "\n");
        }
        return zooString.toString();
    }
}