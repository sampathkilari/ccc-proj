#include "../include/AI.h"
#include <algorithm>

AI::AI() {
    memo.clear();
}

bool AI::canWin(int coins) const {
    // Base case: if no coins left, current player loses (previous player took last coin)
    if (coins <= 0) {
        return false;
    }
    
    // Check memoization
    if (memo.find(coins) != memo.end()) {
        return memo[coins];
    }
    
    // Try all possible moves (remove 1, 2, or 3 coins)
    for (int move = 1; move <= 3 && move <= coins; ++move) {
        int nextCoins = coins - move;
        
        // If opponent loses after our move, we win
        if (!canWin(nextCoins)) {
            memo[coins] = true;
            return true;
        }
    }
    
    // No winning move found, we lose
    memo[coins] = false;
    return false;
}

int AI::findBestMove(int coinsRemaining) {
    // Try moves in order (1, 2, 3 coins) and pick the first one that leads to a win
    for (int move = 1; move <= 3 && move <= coinsRemaining; ++move) {
        int nextCoins = coinsRemaining - move;
        
        // If opponent loses after our move, this is a winning move
        if (!canWin(nextCoins)) {
            return move;
        }
    }
    
    // If no winning move, return 1 (safe default)
    return 1;
}

bool AI::isWinningState(int coins) const {
    return canWin(coins);
}

void AI::clearMemo() {
    memo.clear();
}
