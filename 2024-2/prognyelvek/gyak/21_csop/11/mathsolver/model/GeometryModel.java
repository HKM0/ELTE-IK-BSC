package mathsolver.model;

public class GeometryModel implements MathModel {
    public String generateExercise() {
        return "Sum of inner angles of a triangle?";
    }

    public boolean evaluateUserSolution(int solution) {
        return solution == 180;
    }
}