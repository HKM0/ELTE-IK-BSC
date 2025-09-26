package mathsolver;

import mathsolver.view.ExerciseSolverPanel;
import mathsolver.model.EquationsModel;
import mathsolver.model.GeometryModel;

public class MathSolverMain {
    public static void main(String[] args) {
        ExerciseSolverPanel equationsPanel = new ExerciseSolverPanel(new EquationsModel());
        ExerciseSolverPanel geometryPanel = new ExerciseSolverPanel(new GeometryModel());

        equationsPanel.updateDisplay();
        equationsPanel.handleUserInput();

        geometryPanel.updateDisplay();
        geometryPanel.handleUserInput();
    }
}