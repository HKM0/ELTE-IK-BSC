/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package neptun_kod;

import java.util.LinkedList;
import java.util.Queue;
import java.util.List;
import java.util.Random;
/**
 *
 * @author heki
 */
public class Game {
    private final Board board;
    private final List<Player> players;
    private final Queue<Integer> diceRolls;
    private final int rounds;
    
    public Game(Board board, List<Player> players, Queue<Integer> diceRolls, int rounds  ){
        this.board = board;
        this.players = players;
        this.diceRolls = diceRolls;
        this.rounds = rounds;
    }
    public Game(Board board, List<Player> players, Queue<Integer> diceRolls){
        this.board = board;
        this.players = players;
        this.diceRolls = diceRolls;
        this.rounds = -1;
    }
    
    public Game(Board board, List<Player> players){
        this.board = board;
        this.players = players;
        this.diceRolls = new LinkedList<>();
        this.rounds = -1;
    }
    
    /**
     * Elinditja a jatekot: megadott korig vagy az utolso jatekosig fut.
    */
    public void start(){
        if (rounds == -1) {
            // csak egy marad
            startUntilOneRemains();
        } else {
            // korig megy
            startForRounds();
        }
    }
    
    private void startForRounds() {
        for (int round = 1; round <= rounds; round++){
            System.out.println("\n|====|\t"+round+".\t|====|");
            for (Player player : players)
            {
                System.out.print(player.getName()+"\tegyenlege:\t"+player.getBalance()+"\tmezoi:\t");
                printPlayerProperties(player);
                System.out.println();
            }
            System.out.println("|====================|");
            for (Player player : players) {
                if (!player.isActive()){
                    continue;
                }
                nextTurn(player);
            }
        }
    }
    
    private void printPlayerProperties(Player player) {
        if (player.getProperties().isEmpty()) {
            System.out.print("nincs");
        } else {
            for (int i = 0; i < player.getProperties().size(); i++) {
                PropertyField p = player.getProperties().get(i);
                System.out.print(p.getIndex());
                if (p.hasHouse()) {
                    System.out.print("(H)");
                }
                if (i < player.getProperties().size() - 1) {
                    System.out.print(", ");
                }
            }
        }
    }
    
    private void startUntilOneRemains() {
        int round = 0;
        while (!isGameOver()) {
            round++;
            System.out.println("\n|====|\t" + round + ". kor\t|====|");
            for (Player player : players)
            {
                System.out.print(player.getName()+" egyenlege: "+player.getBalance()+" mezoi: ");
                printPlayerProperties(player);
                System.out.println();
            }
            System.out.println("|====================|");
            for (Player player : players) {
                if (!player.isActive()) {
                    continue;
                }
                nextTurn(player);
                
                if (!player.isActive()) {
                    handlePlayerElimination(player);
                }
                
                if (isGameOver()) {
                    break;
                }
            }
        }
        
        // Nyertes kiirasa
        announceWinner();
    }
    
    public boolean isGameOver() {
        int activePlayers = 0;
        for (Player player : players) {
            if (player.isActive()) {
                activePlayers++;
            }
        }
        return activePlayers <= 1;
    }
    
    /**
     * Vegrehajt egy jatekos kort: dob, lep es a mezon vegrehajtja a muveletet.
     * @param player a jatekos, aki korben van
    */
    public void nextTurn(Player player){
        int dice = rollDice();
        System.out.println(player.getName() + " dobasa: "+dice);
        
        player.move(dice, board);
        
        Field field = board.getField(player.getPosition());
        field.onStep(player);
        
        if (!player.isActive()) {
            System.out.println(player.getName() + " kiesett a jatekbol!");
        }
    }
    
    private void handlePlayerElimination(Player player) {
        System.out.println(player.getName() + " osszes ingatlanja elveszik es ujra vasarolhatova valik.");
        
        for (PropertyField property : player.getProperties()) {
            property.setOwner(null);
            property.setHouse(false);
        }
        player.getProperties().clear();
    }
    
    private void announceWinner() {
        Player winner = null;
        for (Player player : players) {
            if (player.isActive()) {
                winner = player;
                break;
            }
        }
        
        if (winner != null) {
            System.out.println("\n*** JATEK VEGE ***");
            System.out.println("A gyoztes: " + winner.getName() + "!");
            System.out.println("Vegso tokeje: " + winner.getBalance() + " Petak");
            System.out.println("Ingatlanok szama: " + winner.getProperties().size());
        } else {
            System.out.println("\n*** JATEK VEGE ***");
            System.out.println("Nincs gyoztes!");
        }
    }
    
    private int rollDice(){
        if (diceRolls != null && !diceRolls.isEmpty()){
            return diceRolls.poll();
        } else {
            return new Random().nextInt(6)+1;
        }
    }
    public void printStatus(){
        System.out.println("--- Vegso Allas ----");
        for (Player player : players){
            System.out.print(player.getName()+": "+player.getBalance()+" Petak, ingatlanok: ");
            printPlayerProperties(player);
            System.out.println();
        }
        System.out.println();
    }
}
