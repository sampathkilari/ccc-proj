#include "../include/Game.h"
#include <iostream>
#include <iomanip>

Game::Game(int initialCoins) 
    : coinsRemaining(initialCoins), currentPlayer(Player::HUMAN) {
    if (coinsRemaining < 1) {
        coinsRemaining = 10;  // Default value
    }
}

int Game::getCoinsRemaining() const {
    return coinsRemaining;
}

Player Game::getCurrentPlayer() const {
    return currentPlayer;
}

bool Game::isGameOver() const {
    return coinsRemaining <= 0;
}

bool Game::makeMove(int coinsToRemove) {
    // Validate move
    if (coinsToRemove < 1 || coinsToRemove > 3) {
        std::cout << "Invalid move! You can only remove 1, 2, or 3 coins.\n";
        return false;
    }
    
    if (coinsToRemove > coinsRemaining) {
        std::cout << "Invalid move! Not enough coins remaining.\n";
        return false;
    }
    
    coinsRemaining -= coinsToRemove;
    return true;
}

void Game::switchPlayer() {
    if (currentPlayer == Player::HUMAN) {
        currentPlayer = Player::AI;
    } else {
        currentPlayer = Player::HUMAN;
    }
}

Player Game::getWinner() const {
    // The player who took the last coin wins
    // So the player who plays next (current) has lost
    return (currentPlayer == Player::HUMAN) ? Player::AI : Player::HUMAN;
}

void Game::resetGame(int initialCoins) {
    coinsRemaining = initialCoins;
    currentPlayer = Player::HUMAN;
    if (coinsRemaining < 1) {
        coinsRemaining = 10;
    }
}

void Game::displayState() const {
    std::cout << "\n" << std::string(50, '=') << "\n";
    std::cout << "Coins Remaining: " << std::setw(2) << coinsRemaining;
    
    // Visual representation
    std::cout << " [";
    for (int i = 0; i < coinsRemaining; ++i) {
        std::cout << "●";
    }
    std::cout << "]\n";
    
    std::cout << "Current Player: " << (currentPlayer == Player::HUMAN ? "YOU" : "AI") << "\n";
    std::cout << std::string(50, '=') << "\n";
}
