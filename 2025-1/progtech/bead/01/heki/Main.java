/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package neptun_kod;

import java.util.*;
import java.io.*;

/**
 *
 * @author heki
 */
public class Main {

    //-----------------------------------------------------------
    //main
    public static void main(String[] args) {
        try {
            readAndStartGame();
        } catch (InputFileException e) {
            System.out.println("HIBA a bementi fajl feldolgozasa kozben: " + e.getMessage());
            System.out.println("\npelda jatek");
            runExampleGame();
        } catch (FileNotFoundException e) {
            System.out.println("input.txt nem talalhato, pelda jatek");
            runExampleGame();
        }
    }

    private static void readAndStartGame() throws FileNotFoundException, InputFileException {
        Scanner scanner = null;
        try {
            scanner = new Scanner(new File("input.txt"));
            System.out.println("input fajl megtalalva!");
            
            //-----------------------------------------------------------
            // Palya hosszanak beolvasasa
            if (!scanner.hasNextInt()) {
                throw new InputFileException("hianyzik/hibas palya hossz!");
            }
            int fieldCount = scanner.nextInt();
            if (fieldCount <= 0) {
                throw new InputFileException("A palya hosszanak pozitivnak kell lennie!");
            }
            scanner.nextLine(); // sor vege
            
            //-----------------------------------------------------------
            // mezok beolvasasa
            List<Field> fields = new ArrayList<>();
            for (int i = 0; i < fieldCount; i++) {
                if (!scanner.hasNextLine()) {
                    throw new InputFileException("hianyoznak a"+(i + 1) +". mezo adatai!");
                }
                String line = scanner.nextLine().trim();
                if (line.isEmpty()) {
                    throw new InputFileException("ures sor "+(i + 1)+". mezonel!");
                }
                
                String[] parts = line.split(" ");
                String fieldType = parts[0].toLowerCase();
                
                try {
                    if (fieldType.equals("property")) {
                        fields.add(new PropertyField(i));
                    } else if (fieldType.equals("service")) {
                        if (parts.length < 2) {
                            throw new InputFileException("hianyzik a szolgaltatas dij " + (i + 1) + ". mezonel!");
                        }
                        int fee = Integer.parseInt(parts[1]);
                        if (fee < 0) {
                            throw new InputFileException("a szolgaltatas dij nem lehet negativ! (" + (i + 1) + ". mezo)");
                        }
                        fields.add(new ServiceField(i, fee));
                    } else if (fieldType.equals("luck")) {
                        if (parts.length < 2) {
                            throw new InputFileException("hianyzik a szerencse mezo jutalom adata " + (i + 1) + ". mezonel!");
                        }
                        int reward = Integer.parseInt(parts[1]);
                        fields.add(new LuckField(i, reward));
                    } else {
                        throw new InputFileException("ismeretlen mezo tipus: '" + fieldType + "' a " + (i + 1) + ". mezonel!");
                    }
                } catch (Exception e) {
                    throw new InputFileException("hibas szamformatum a " + (i + 1) + ". mezonel!");
                }
            }
            
            if (fields.isEmpty()) {
                throw new InputFileException("a palyan legalabb egy mezonek lennie kell!");
            }
            Board board = new Board(fields);
            
            //-----------------------------------------------------------
            // jatekos szama beolvas
            if (!scanner.hasNextInt()) {
                throw new InputFileException("hianyzik/hibas a jatekosok szama!");
            }
            int playerCount = scanner.nextInt();
            if (playerCount <= 0) {
                throw new InputFileException("a jatekosok szamanak pozitivnak kell lennie!");
            }
            if (playerCount < 2) {
                throw new InputFileException("legalabb 2 jatekosnak kell lennie!"); 
            }
            scanner.nextLine(); // sor vege
            

            //-----------------------------------------------------------
            // jatekosok beolvas
            List<Player> players = new ArrayList<>();
            Set<String> playerNames = new HashSet<>();
            for (int i = 0; i < playerCount; i++) {
                if (!scanner.hasNextLine()) {
                    throw new InputFileException("hianyzik a " + (i + 1) + ". jatekos adatai!");
                }
                String line = scanner.nextLine().trim();
                if (line.isEmpty()) {
                    throw new InputFileException("ures sor a " + (i + 1) + ". jatekosnal!");
                }
                
                String[] parts = line.split(" ");
                if (parts.length < 2) {
                    throw new InputFileException("hianyzo nev/strat a " + (i + 1) + ". jatekosnal!");
                }
                
                String name = parts[0];
                String strategyType = parts[1].toLowerCase();
                
                // egyedi nev
                if (playerNames.contains(name)) {
                    throw new InputFileException("egy jatekos nev ketszer lett megadva: " + name);
                }
                playerNames.add(name);
                
                Strategy strategy;
                if (strategyType.equals("greedy")) {
                    strategy = new GreedyStrategy();
                } else if (strategyType.equals("careful")) {
                    strategy = new CarefulStrategy();
                } else if (strategyType.equals("tactical")) {
                    strategy = new TacticalStrategy();
                } else {
                    throw new InputFileException("hibas strategia tipus: '" + strategyType + "' a " + (i + 1) + ". jatekosnal!");
                }
                
                players.add(new Player(name, strategy, 10000, 0, new ArrayList<>(), true));
            }
            
            //-----------------------------------------------------------
            // kockadobas beolvas
            Queue<Integer> diceRolls = new LinkedList<>();
            if (scanner.hasNextLine()) {
                String diceLine = scanner.nextLine().trim();
                if (!diceLine.isEmpty()) {
                    String[] diceValues = diceLine.split(" ");
                    try {
                        for (String value : diceValues) {
                            int diceValue = Integer.parseInt(value.trim());
                            if (diceValue < 1 || diceValue > 6) {
                                throw new InputFileException("a kockadobas erteke csak 1 es 6 kozott lehet ez nem DnD... hibas ertek: " + diceValue);
                            }
                            diceRolls.add(diceValue);
                        }
                    } catch (Exception e) {
                        throw new InputFileException("hibas kockadobas formatum!");
                    }
                }
            }
            
            //-----------------------------------------------------------
            // jatek szim.
            Game game;
            if (!diceRolls.isEmpty()) {
                System.out.println("elore megadott dobasokkal fut! (" + diceRolls.size() + " dobas)");
                game = new Game(board, players, diceRolls);
            } else {
                System.out.println("veletlen dobasokkal fut!");
                game = new Game(board, players);
            }
            
            game.start();
            //game.printStatus();
            
        } finally {
            if (scanner != null) {
                scanner.close();
            }
        }
    }
    
    private static void runExampleGame() {
        // teszt jatek
        List<Field> fields = new ArrayList<>();
        fields.add(new PropertyField(0));
        fields.add(new ServiceField(1, 4000));
        fields.add(new PropertyField(2));
        fields.add(new LuckField(3, 500));
        fields.add(new PropertyField(4));
        fields.add(new ServiceField(5, 3000));
        fields.add(new PropertyField(6));
        fields.add(new LuckField(7, 1000));
        fields.add(new PropertyField(8));
        fields.add(new PropertyField(9));
        Board board = new Board(fields);
        
        List<Player> players = Arrays.asList(
            new Player("Anna", new GreedyStrategy(), 10000, 0, new ArrayList<>(), true),
            new Player("Kristof", new CarefulStrategy(), 10000, 0, new ArrayList<>(), true),
            new Player("Andris", new TacticalStrategy(), 10000, 0, new ArrayList<>(), true)
        );
        
        Queue<Integer> diceRolls = new LinkedList<>(Arrays.asList(3, 2, 4, 1, 5, 6, 2, 3, 1, 4, 1, 3, 1, 1, 6, 3, 6, 3, 2, 4, 1, 5, 2, 1, 3, 2, 1, 2, 1, 2));
        
        Game game = new Game(board, players);
        
        game.start();
        //game.printStatus();
    }
}
