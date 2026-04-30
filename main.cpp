#include "../include/Game.h"
#include "../include/AI.h"
#include "Player.h"
#include <iostream>
#include <limits>
#include <cctype>

void displayWelcome() {
    std::cout << "\n";
    std::cout << "╔════════════════════════════════════════════════════╗\n";
    std::cout << "║     🎮 Game Strategy Optimizer - Coin Game 🎮     ║\n";
    std::cout << "║                    (Nim Variant)                  ║\n";
    std::cout << "╚════════════════════════════════════════════════════╝\n";
    std::cout << "\n📋 RULES:\n";
    std::cout << "  • Start with N coins\n";
    std::cout << "  • Players take turns removing 1, 2, or 3 coins\n";
    std::cout << "  • Player who removes the LAST coin WINS!\n";
    std::cout << "  • AI plays optimally using Minimax + Dynamic Programming\n\n";
}

int getInitialCoins() {
    int coins;
    while (true) {
        std::cout << "Enter number of coins (5-30): ";
        if (std::cin >> coins && coins >= 5 && coins <= 30) {
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            return coins;
        }
        std::cout << "Invalid input! Please enter a number between 5 and 30.\n";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
}

int getPlayerMove() {
    int moveChoice;
    while (true) {
        std::cout << "\nYour turn! Remove how many coins? (1/2/3): ";
        if (std::cin >> moveChoice && (moveChoice == 1 || moveChoice == 2 || moveChoice == 3)) {
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            return moveChoice;
        }
        std::cout << "Invalid input! Please enter 1, 2, or 3.\n";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
}

void displayMoveAnalysis(int coins, const AI& ai) {
    std::cout << "\n💡 AI Analysis:\n";
    std::cout << "   Current state is " 
              << (ai.isWinningState(coins) ? "WINNING" : "LOSING") 
              << " for current player.\n";
}

void playGame() {
    displayWelcome();
    
    int initialCoins = getInitialCoins();
    Game game(initialCoins);
    AI ai;
    
    std::cout << "\n✓ Game started with " << initialCoins << " coins!\n";
    
    while (!game.isGameOver()) {
        game.displayState();
        
        if (game.getCurrentPlayer() == Player::HUMAN) {
            // Human player's turn
            int move = getPlayerMove();
            
            if (game.makeMove(move)) {
                std::cout << "✓ You removed " << move << " coin(s).\n";
                displayMoveAnalysis(game.getCoinsRemaining(), ai);
            } else {
                continue;  // Invalid move, try again
            }
        } else {
            // AI player's turn
            int aiMove = ai.findBestMove(game.getCoinsRemaining());
            game.makeMove(aiMove);
            
            std::cout << "\n🤖 AI's turn - removing " << aiMove << " coin(s).\n";
            displayMoveAnalysis(game.getCoinsRemaining(), ai);
        }
        
        game.switchPlayer();
    }
    
    // Game over - announce winner
    game.displayState();
    Player winner = game.getWinner();
    
    std::cout << "\n╔════════════════════════════════════════════════════╗\n";
    if (winner == Player::HUMAN) {
        std::cout << "║           🎉 CONGRATULATIONS! YOU WIN! 🎉        ║\n";
    } else {
        std::cout << "║              🤖 AI WINS! Well played! 🤖          ║\n";
    }
    std::cout << "╚════════════════════════════════════════════════════╝\n\n";
}

bool askPlayAgain() {
    char response;
    while (true) {
        std::cout << "Play again? (Y/N): ";
        if (std::cin >> response) {
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            response = std::tolower(response);
            if (response == 'y' || response == 'n') {
                return response == 'y';
            }
        }
        std::cout << "Invalid input! Please enter Y or N.\n";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
}

int main() {
    try {
        do {
            playGame();
        } while (askPlayAgain());
        
        std::cout << "\nThank you for playing! 👋\n\n";
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}
