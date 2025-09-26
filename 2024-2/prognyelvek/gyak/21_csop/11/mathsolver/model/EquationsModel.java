package mathsolver.model;

public class EquationsModel implements MathModel {
    public String generateExercise() {
        return "2 + x = 5";
    }

    public boolean evaluateUserSolution(int solution) {
        return solution == 3;
    }
}