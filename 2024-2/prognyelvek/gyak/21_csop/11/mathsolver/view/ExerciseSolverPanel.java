package mathsolver.view;

import mathsolver.model.MathModel;

public class ExerciseSolverPanel {
    MathModel model;

    public ExerciseSolverPanel(MathModel model) {
        this.model = model;
    }

    public void updateDisplay() {
        System.out.println(this.model.generateExercise());
    }

    public void handleUserInput() {
        boolean correct = this.model.evaluateUserSolution(Integer.parseInt(System.console().readLine()));
        System.out.println("Your solution was: " + correct);
    }
}