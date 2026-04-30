#ifndef AI_H
#define AI_H

#include <unordered_map>

class AI {
private:
    // Memoization cache: dp[coins] = true if current player wins, false if loses
    mutable std::unordered_map<int, bool> memo;
    
    // Helper function for minimax with memoization
    bool canWin(int coins) const;
    
public:
    AI();
    
    // Find the best move for AI
    int findBestMove(int coinsRemaining);
    
    // Check if current player can win from this state
    bool isWinningState(int coins) const;
    
    // Clear memoization cache
    void clearMemo();
};

#endif // AI_H
