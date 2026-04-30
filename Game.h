#ifndef GAME_H
#define GAME_H

#include "Player.h"

class Game {
private:
    int coinsRemaining;
    Player currentPlayer;

public:
    Game(int initialCoins);
    
    // Game state queries
    int getCoinsRemaining() const;
    Player getCurrentPlayer() const;
    bool isGameOver() const;
    
    // Game actions
    bool makeMove(int coinsToRemove);
    void switchPlayer();
    Player getWinner() const;
    void resetGame(int initialCoins);
    
    // Display
    void displayState() const;
};

#endif // GAME_H
