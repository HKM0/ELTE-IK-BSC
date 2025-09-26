package arraylistdemo;

import java.util.ArrayList;

public class ArrayListDemo {
    public static void removeStringsWithSameBeginningAndEnding(ArrayList<String> strings) {
        strings.removeIf(element -> { return element.charAt(0) == element.charAt(element.length() - 1); });
    }
}