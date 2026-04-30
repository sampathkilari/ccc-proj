# 🎮 Game Strategy Optimizer - Coin Game (Nim Variant)

A sophisticated two-player strategy game where you compete against an AI opponent that uses **Minimax Algorithm** and **Dynamic Programming** to play optimally.

## 📋 Project Overview

This project demonstrates key algorithmic concepts:
- **Minimax Algorithm**: Optimal decision-making in adversarial games
- **Dynamic Programming & Memoization**: Efficient computation by caching results
- **Game Theory**: Winning and losing states analysis

## 🎯 Game Rules

1. **Start** with N coins (player-defined: 5-30)
2. **Take turns** removing 1, 2, or 3 coins
3. **Winner**: Player who removes the LAST coin wins
4. **AI** plays optimally using algorithmic analysis

## 🏗️ Project Structure

```
MiniMax-Engine/
├── include/
│   ├── Player.h          # Player enum (HUMAN, AI)
│   ├── Game.h            # Game state management
│   └── AI.h              # AI logic with Minimax + DP
├── src/
│   ├── main.cpp          # Game loop and UI
│   ├── Game.cpp          # Game implementation
│   └── AI.cpp            # AI implementation
├── CMakeLists.txt        # CMake build configuration
├── Makefile              # GNU Make configuration
└── README.md             # This file
```

## 🔧 Building the Project

### Option 1: Using CMake (Cross-platform)

```bash
# Create build directory
mkdir build
cd build

# Generate build files
cmake ..

# Build
cmake --build .

# Run
./coin_game        # Linux/macOS
./coin_game.exe    # Windows
```

### Option 2: Using Make (Linux/macOS)

```bash
# Build
make

# Run
make run

# Clean build files
make clean
```

### Option 3: Manual Compilation

```bash
g++ -std=c++17 -Wall -Wextra -pedantic \
    -I./include \
    src/main.cpp src/Game.cpp src/AI.cpp \
    -o coin_game

# Run
./coin_game
```

## 🎮 How to Play

1. **Start the game**: `./coin_game`
2. **Enter number of coins**: Choose between 5-30
3. **Your turn**: Select 1, 2, or 3 coins to remove
4. **AI's turn**: Watch AI make optimal decisions
5. **Win condition**: Be the player to remove the last coin
6. **Play again**: Choose to play another round

## 🧠 Algorithm Explanation

### Minimax with Dynamic Programming

The AI uses a recursive approach with memoization:

```
canWin(coins):
  Base case: if coins ≤ 0, return false (current player loses)
  
  For each possible move (1, 2, 3 coins):
    If opponent loses after this move:
      return true (this is a winning move)
  
  If no winning move found:
    return false (current player loses)
```

**Key Insight**: A position is winning if there exists at least one move that puts the opponent in a losing position.

### Memoization Cache

Results are cached to avoid recalculating:
- `memo[coins] = true`: Winning state for current player
- `memo[coins] = false`: Losing state for current player

This reduces time complexity from O(3^n) to O(n).

## 📊 Example Game States

| Coins | Winning? | Optimal Move |
|-------|----------|--------------|
| 1     | No       | - (already lost) |
| 2     | No       | - (already lost) |
| 3     | No       | - (already lost) |
| 4     | Yes      | Remove 1 |
| 5     | Yes      | Remove 1 |
| 6     | Yes      | Remove 1 |
| 7     | Yes      | Remove 1 |
| 8     | No       | - (losing) |

**Pattern**: States with coins % 4 == 0 are losing positions.

## 🚀 Features

### Core Features
✓ Play against AI  
✓ Optimal AI decisions using Minimax  
✓ Dynamic Programming with memoization  
✓ Simple console-based UI  
✓ Input validation  
✓ Visual coin representation  

### Advanced Features
- 💡 AI analysis display (winning/losing state)
- 🔄 Play multiple rounds
- 📈 Scalable to higher coin counts
- 🛡️ Robust error handling

## 🔍 Technical Details

### Files Description

**Player.h**: Enum defining HUMAN and AI players

**Game.h/Game.cpp**: 
- Manages game state (coins, current player)
- Validates moves
- Detects game end conditions
- Displays game state

**AI.h/AI.cpp**:
- `canWin(coins)`: DP function with memoization
- `findBestMove(coins)`: Returns optimal move
- `isWinningState(coins)`: Analyzes current position

**main.cpp**:
- Game loop orchestration
- User input handling
- Display formatting
- Game flow control

## 💻 System Requirements

- **C++ Compiler**: C++17 or later (g++, clang, MSVC)
- **Build Tool**: CMake or Make (optional, direct compilation also works)
- **OS**: Windows, Linux, macOS

## 🎓 Learning Outcomes

By studying this project, you'll understand:

1. **Minimax Algorithm**: How AI thinks ahead in games
2. **Dynamic Programming**: Optimizing recursive solutions
3. **Memoization**: Caching to improve performance
4. **Game Theory**: Winning/losing positions
5. **C++ OOP**: Class design and architecture
6. **State Management**: Tracking game progress

## 🔬 Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| findBestMove() | O(n) | O(n) |
| canWin() (with memo) | O(n) | O(n) |
| canWin() (without memo) | O(3^n) | O(n) |
| Game state update | O(1) | O(1) |

## 📝 Sample Game Session

```
╔════════════════════════════════════════════════════╗
║     🎮 Game Strategy Optimizer - Coin Game 🎮     ║
║                    (Nim Variant)                  ║
╚════════════════════════════════════════════════════╝

Enter number of coins (5-30): 10
✓ Game started with 10 coins!

==================================================
Coins Remaining: 10 [●●●●●●●●●●]
Current Player: YOU
==================================================

Your turn! Remove how many coins? (1/2/3): 1
✓ You removed 1 coin(s).

💡 AI Analysis:
   Current state is WINNING for current player.

==================================================
Coins Remaining:  9 [●●●●●●●●●]
Current Player: AI
==================================================

🤖 AI's turn - removing 3 coin(s).

💡 AI Analysis:
   Current state is LOSING for current player.
```

## 🐛 Troubleshooting

**Issue**: Compilation error about missing headers
- **Solution**: Ensure include paths are correct in CMake or Makefile

**Issue**: Game crashes on invalid input
- **Solution**: Input validation is built-in; try again with valid values

**Issue**: AI seems random
- **Solution**: This shouldn't happen; AI always plays optimally

## 📞 Support

For issues or questions, review the code structure and algorithm explanation above.

## 📄 License

Educational/Open Source - Feel free to modify and distribute.

---

**Happy Learning! 🎓** Enjoy mastering game theory and algorithms! 🚀
