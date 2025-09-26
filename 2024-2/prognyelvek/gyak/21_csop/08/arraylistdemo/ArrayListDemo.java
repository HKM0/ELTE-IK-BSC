import java.util.ArrayList;

// ArrayList documentation:
// https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html

public class ArrayListDemo {
    // We return a new ArrayString<String> object containing Strings that have the same beginning and ending characters
    // from the input ArrayList<String> in the parameters
    public static ArrayList<String> getStrSameBeginningAndEnding(ArrayList<String> strings) {
        ArrayList<String> result = new ArrayList<String>();
        for (String str : strings) {
            if (str.length() > 0 && str.charAt(0) == str.charAt(str.length() - 1)) {
                result.add(str); // adds an element to the end of the ArrayList
            }
        }

        return result;
    }

    // Uses a lambda expression to remove Strings with differing beginning and ending characters
    // from the original ArrayList in the parameters
    public static void removeStrDifferBeginningAndEnding(ArrayList<String> strings) {
        strings.removeIf(element -> (element.length() == 0 || element.charAt(0) != element.charAt(element.length() - 1)) );
    }

    public static void main(String[] args) {
        // ArrayList<Integer> numbers = new ArrayList<Integer>();
        ArrayList<String> strings1 = new ArrayList<String>();
        strings1.add("ada");
        strings1.add("java");
        strings1.add("");
        strings1.add("aaa");
        System.out.println(strings1);

        ArrayList<String> mainResult = getStrSameBeginningAndEnding(strings1);
        System.out.println(mainResult);

        removeStrDifferBeginningAndEnding(strings1);
        System.out.println(strings1);
    }
}