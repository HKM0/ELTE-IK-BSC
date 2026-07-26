/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package neptun_code;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Properties;

/**
 *
 * @author heki
 */
public class HighScores {
    // docker exec -it busy_pascal mysql -u root -p
    //mysql -u tanulo -p -h localhost
    
    int maxScores;
    PreparedStatement insertStatement;
    PreparedStatement deleteStatement;
    Connection connection;

    public HighScores(int maxScores) throws SQLException {
        this.maxScores = maxScores;
        Properties connectionProps = new Properties();
        connectionProps.put("user", "tanulo");
        connectionProps.put("password", "asd123");
        connectionProps.put("serverTimezone", "UTC");
        String dbURL = "jdbc:mysql://localhost:3306/highscores";
        connection = DriverManager.getConnection(dbURL, connectionProps);
        
        String insertQuery = "INSERT INTO HIGHSCORES (TIMESTAMP, NAME, SCORE) VALUES (?, ?, ?)";
        insertStatement = connection.prepareStatement(insertQuery);
        String deleteQuery = "DELETE FROM HIGHSCORES WHERE SCORE=?";
        deleteStatement = connection.prepareStatement(deleteQuery);
    }

    public ArrayList<HighScore> getHighScores() throws SQLException {
        String query = "SELECT * FROM HIGHSCORES";
        ArrayList<HighScore> highScores = new ArrayList<>();
        Statement stmt = connection.createStatement();
        ResultSet results = stmt.executeQuery(query);
        while (results.next()) {
            String name = results.getString("NAME");
            int score = results.getInt("SCORE");
            highScores.add(new HighScore(name, score));
        }
        sortHighScores(highScores);
        return highScores;
    }

    public void putHighScore(String name, int score) throws SQLException {
        ArrayList<HighScore> highScores = getHighScores();
        if (highScores.size() < maxScores) {
            insertScore(name, score);
        } else {
            int leastScore = highScores.get(highScores.size() - 1).getScore();
            if (leastScore < score) {
                deleteScores(leastScore);
                insertScore(name, score);
            }
        }
    }

    /**
     * Eredmenyek csökkenő sorrendben.
     * @param highScores 
     */
    private void sortHighScores(ArrayList<HighScore> highScores) {
        Collections.sort(highScores, new Comparator<HighScore>() {
            @Override
            public int compare(HighScore t, HighScore t1) {
                return t1.getScore() - t.getScore();
            }
        });
    }

    private void insertScore(String name, int score) throws SQLException {
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        insertStatement.setTimestamp(1, ts);
        insertStatement.setString(2, name);
        insertStatement.setInt(3, score);
        insertStatement.executeUpdate();
    }

    /**
     * minden eredményt töröl
     * @param score
     */
    private void deleteScores(int score) throws SQLException {
        deleteStatement.setInt(1, score);
        deleteStatement.executeUpdate();
    }
}
