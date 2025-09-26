package arraylistdemo;

import java.util.ArrayList;

public class ArrayListDemo {
    public static ArrayList<String> getSameBeginningAndEndingStrings(ArrayList<String> strings) {
        ArrayList<String> result = new ArrayList<String>();

        for (String str : strings) {
            if (str.length() != 0 && str.charAt(0) == str.charAt(str.length() - 1)) { result.add(str); }
        }

        return result;
    }

    public static void removeSameBeginningAndEndingStrings(ArrayList<String> strings) {
        strings.removeIf(str -> {return str.length() == 0 || str.charAt(0) == str.charAt(str.length() - 1); });
    }
}