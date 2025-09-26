package workers;

import java.util.HashSet;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Map.Entry;

public class WorkerSchedule {
    private HashMap<Integer, HashSet<String>> weekToWorkers;

    public WorkerSchedule() {
        this.weekToWorkers = new HashMap<Integer, HashSet<String>>();
    }

    public void add(int week, HashSet<String> workers) {
        if (weekToWorkers.containsKey(week)) {
            HashSet<String> set = this.weekToWorkers.get(week);
            set.addAll(workers);
            this.weekToWorkers.put(week, set);
        }
        else {
            this.weekToWorkers.put(week, workers);
        }
    }

    public void add(HashSet<Integer> weeks, ArrayList<String> workers) {
        HashSet<String> workersSet = new HashSet<String>(workers);
        for (Integer week : weeks) {
            this.add(week, workersSet);
        }
    }

    public boolean isWorkingOnWeek(String worker, int week) {
        return this.weekToWorkers.get(week).contains(worker);
    }

    public HashSet<Integer> getWorkWeeks(String worker) {
        HashSet<Integer> result = new HashSet<Integer>();

        for (Entry<Integer, HashSet<String>> entry : this.weekToWorkers.entrySet()) {
            if (entry.getValue().contains(worker)) {
                result.add(entry.getKey());
            }
        }

        return result;
    }
}

// Ezt bármiféle kipróbálás vagy tesztelés nélkül írtam;
// Önálló feladat funkcionális tesztelőt írni rá, kipróbálni és megfixálni, ha bármi nem jó a megoldóprogramban