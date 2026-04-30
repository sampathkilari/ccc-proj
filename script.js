// Game State Management
class CoinGameAI {
    constructor() {
        this.memo = new Map();
    }

    // Minimax with Memoization: Check if current player can win from this state
    canWin(coins) {
        // Base case: no coins left, current player loses
        if (coins <= 0) {
            return false;
        }

        // Check memoization
        if (this.memo.has(coins)) {
            return this.memo.get(coins);
        }

        // Try all possible moves (1, 2, 3 coins)
        for (let move = 1; move <= 3 && move <= coins; move++) {
            const nextCoins = coins - move;
            // If opponent loses after our move, we win
            if (!this.canWin(nextCoins)) {
                this.memo.set(coins, true);
                return true;
            }
        }

        // No winning move found
        this.memo.set(coins, false);
        return false;
    }

    // Find the best move for AI
    findBestMove(coinsRemaining, difficulty = 'hard') {
        if (difficulty === 'easy') {
            // Random move
            return Math.floor(Math.random() * 3) + 1;
        }

        // Hard: Optimal move using Minimax
        for (let move = 1; move <= 3 && move <= coinsRemaining; move++) {
            const nextCoins = coinsRemaining - move;
            if (!this.canWin(nextCoins)) {
                return move;
            }
        }

        return 1; // Safe default
    }

    // Check if a position is winning
    isWinningState(coins) {
        return this.canWin(coins);
    }

    clearMemo() {
        this.memo.clear();
    }
}

// Game Controller
class GameController {
    constructor() {
        this.coinsRemaining = 10;
        this.currentPlayer = 'human'; // 'human' or 'ai'
        this.gameOver = false;
        this.ai = new CoinGameAI();
        this.difficulty = 'easy';
        this.gameHistory = [];
    }

    startGame(initialCoins, difficulty) {
        this.coinsRemaining = initialCoins;
        this.currentPlayer = 'human';
        this.gameOver = false;
        this.difficulty = difficulty;
        this.ai.clearMemo();
        this.gameHistory = [];
    }

    makeMove(coinsToRemove) {
        if (this.gameOver || coinsToRemove < 1 || coinsToRemove > 3) {
            return false;
        }

        if (coinsToRemove > this.coinsRemaining) {
            return false;
        }

        this.coinsRemaining -= coinsToRemove;
        this.gameHistory.push({
            player: this.currentPlayer,
            coinsRemoved: coinsToRemove,
            coinsRemaining: this.coinsRemaining
        });

        return true;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'human' ? 'ai' : 'human';
    }

    checkGameEnd() {
        if (this.coinsRemaining <= 0) {
            this.gameOver = true;
            return true;
        }
        return false;
    }

    getWinner() {
        // The player who took the last coin wins
        // So we check who made the last move
        if (this.gameHistory.length > 0) {
            const lastMove = this.gameHistory[this.gameHistory.length - 1];
            return lastMove.player === 'human' ? 'human' : 'ai';
        }
        return null;
    }

    getAIMove() {
        return this.ai.findBestMove(this.coinsRemaining, this.difficulty);
    }

    isWinningState() {
        return this.ai.isWinningState(this.coinsRemaining);
    }
}

// UI Controller
class UIController {
    constructor() {
        this.gameCtrl = new GameController();
        this.setupModal = document.getElementById('setupModal');
        this.gameOverModal = document.getElementById('gameOverModal');
        this.moveSection = document.getElementById('moveSection');
        this.analysisSection = document.getElementById('analysisSection');
        this.coinSlider = document.getElementById('coinSlider');
        this.sliderValue = document.querySelector('.slider-value');
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.moveButtons = document.querySelectorAll('.move-btn');
        this.difficultyBtns = document.querySelectorAll('.difficulty-btn');
        this.coinsContainer = document.getElementById('coinsContainer');

        this.selectedDifficulty = 'easy';

        this.initEventListeners();
    }

    initEventListeners() {
        // Slider
        this.coinSlider.addEventListener('input', (e) => {
            this.sliderValue.textContent = e.target.value;
        });

        // Difficulty buttons
        this.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.difficultyBtns.forEach(b => b.classList.remove('active'));
                e.target.closest('.difficulty-btn').classList.add('active');
                this.selectedDifficulty = e.target.closest('.difficulty-btn').dataset.difficulty;
            });
        });

        // Start button
        this.startBtn.addEventListener('click', () => {
            this.startGame();
        });

        // Move buttons
        this.moveButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const coinsToRemove = parseInt(e.target.closest('.move-btn').dataset.coins);
                this.handlePlayerMove(coinsToRemove);
            });
        });

        // Game over buttons
        this.restartBtn.addEventListener('click', () => {
            this.startGame();
        });

        this.newGameBtn.addEventListener('click', () => {
            this.resetToSetup();
        });
    }

    startGame() {
        const initialCoins = parseInt(this.coinSlider.value);
        this.gameCtrl.startGame(initialCoins, this.selectedDifficulty);
        
        this.setupModal.style.display = 'none';
        this.gameOverModal.style.display = 'none';
        this.moveSection.style.display = 'block';
        this.analysisSection.style.display = 'none';

        this.updateUI();
        this.renderCoins();
    }

    resetToSetup() {
        this.setupModal.style.display = 'flex';
        this.gameOverModal.style.display = 'none';
        this.moveSection.style.display = 'none';
        this.analysisSection.style.display = 'none';
    }

    handlePlayerMove(coinsToRemove) {
        if (this.gameCtrl.gameOver || this.gameCtrl.currentPlayer !== 'human') {
            return;
        }

        if (coinsToRemove > this.gameCtrl.coinsRemaining) {
            this.showHint('Not enough coins! Try removing fewer coins.');
            return;
        }

        // Make move
        this.gameCtrl.makeMove(coinsToRemove);
        this.renderCoins();

        // Check game end
        if (this.gameCtrl.checkGameEnd()) {
            this.showGameOver('human');
            return;
        }

        this.updateUI();

        // Disable buttons and show AI analysis
        this.disableMoveButtons(true);
        this.analysisSection.style.display = 'block';

        // AI turn after delay
        setTimeout(() => {
            this.playAITurn();
        }, 2000);
    }

    playAITurn() {
        this.gameCtrl.switchPlayer();
        const aiMove = this.gameCtrl.getAIMove();
        
        this.gameCtrl.makeMove(aiMove);
        this.renderCoins();

        // Check game end
        if (this.gameCtrl.checkGameEnd()) {
            this.analysisSection.style.display = 'none';
            this.showGameOver('ai');
            return;
        }

        this.gameCtrl.switchPlayer();
        this.updateUI();
        this.disableMoveButtons(false);
        this.analysisSection.style.display = 'none';
    }

    renderCoins() {
        this.coinsContainer.innerHTML = '';
        for (let i = 0; i < this.gameCtrl.coinsRemaining; i++) {
            const coin = document.createElement('div');
            coin.className = 'coin';
            coin.textContent = '₹';
            coin.style.animation = `coinDrop 0.6s ease-out ${i * 0.05}s`;
            this.coinsContainer.appendChild(coin);
        }
    }

    updateUI() {
        // Update stats
        document.getElementById('coinsCount').textContent = this.gameCtrl.coinsRemaining;
        
        const turnIndicator = document.getElementById('turnIndicator');
        if (this.gameCtrl.currentPlayer === 'human') {
            turnIndicator.textContent = 'YOUR TURN';
            turnIndicator.style.color = 'var(--accent-teal)';
        } else {
            turnIndicator.textContent = 'AI TURN';
            turnIndicator.style.color = 'var(--accent-gold)';
        }

        // Update status
        const statusText = document.getElementById('statusText');
        if (this.gameCtrl.currentPlayer === 'human') {
            const isWinning = this.gameCtrl.isWinningState();
            statusText.textContent = isWinning ? 'Winning Position' : 'Losing Position';
            statusText.style.color = isWinning ? 'var(--accent-teal)' : 'var(--accent-gold)';
        } else {
            statusText.textContent = 'AI Thinking...';
            statusText.style.color = 'var(--accent-purple)';
        }

        // Update analysis info
        if (this.analysisSection.style.display === 'block') {
            const analysisText = document.getElementById('analysisText');
            const isWinning = this.gameCtrl.isWinningState();
            analysisText.textContent = `Current state is ${isWinning ? 'WINNING' : 'LOSING'} for current player.`;
        }

        // Update move buttons - disable if not enough coins
        this.moveButtons.forEach(btn => {
            const coinsValue = parseInt(btn.dataset.coins);
            btn.disabled = coinsValue > this.gameCtrl.coinsRemaining || this.gameCtrl.currentPlayer !== 'human';
        });
    }

    disableMoveButtons(disabled) {
        this.moveButtons.forEach(btn => {
            btn.disabled = disabled || parseInt(btn.dataset.coins) > this.gameCtrl.coinsRemaining;
        });
    }

    showGameOver(winner) {
        this.gameCtrl.gameOver = true;
        
        const modalHeader = document.getElementById('modalHeader');
        const resultText = document.getElementById('resultText');
        const resultDescription = document.getElementById('resultDescription');

        if (winner === 'human') {
            modalHeader.innerHTML = '<h2>Victory!</h2>';
            resultText.textContent = 'Congratulations! You won!';
            resultDescription.textContent = 'You removed the last coin and won the game.';
            resultText.style.color = 'var(--accent-teal)';
        } else {
            modalHeader.innerHTML = '<h2>Game Over</h2>';
            resultText.textContent = 'AI Wins';
            resultDescription.textContent = 'The AI played optimally using Minimax algorithm and dynamic programming.';
            resultText.style.color = 'var(--accent-gold)';
        }

        this.gameOverModal.style.display = 'flex';
    }

    showHint(message) {
        const hintText = document.getElementById('hintText');
        hintText.textContent = message;
        hintText.style.animation = 'none';
        setTimeout(() => {
            hintText.style.animation = 'bounce 2s ease-in-out infinite';
            hintText.textContent = 'Make your move wisely!';
        }, 2000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UIController();
});
