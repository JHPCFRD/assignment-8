/**
 * Name: Jay Park
 * Date: 11.12.2025
 * CSC 372-01
 *
 * This script contains the logic of the rock-paper-scissors game.
 */

const game = {
    init() {
        this.choices = ['rock', 'paper', 'scissors'];
        this.playerChoice = null;
        this.computerChoice = null;
        this.animating = false;
        this.animationInterval = null;
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
        this.setupEventListeners();
        this.updateScoreDisplay();
    },

    setupEventListeners() {
        const playerChoices = document.querySelectorAll('.choice');
        const playAgainButton = document.getElementById('play-again');
        const resetScoreButton = document.getElementById('reset-score');

        playerChoices.forEach(choice => {
            choice.addEventListener('click', (event) => {
                this.handlePlayerChoice(event.currentTarget.id);
            });
        });

        playAgainButton.addEventListener('click', () => {
            this.resetGame();
        });

        resetScoreButton.addEventListener('click', () => {
            this.resetScore();
        });
    },

    handlePlayerChoice(choice) {
        if (this.animating) return;
        this.playerChoice = choice;
        this.highlightPlayerChoice();
        this.disablePlayerChoices();
        this.startComputerAnimation();
    },

    highlightPlayerChoice() {
        const choices = document.querySelectorAll('.choice');
        choices.forEach(choice => {
            choice.classList.remove('selected');
        });

        const selectedChoice = document.getElementById(this.playerChoice);
        selectedChoice.classList.add('selected');
    },

    disablePlayerChoices() {
        const choices = document.querySelectorAll('.choice');
        choices.forEach(choice => {
            choice.style.pointerEvents = 'none';
        });
    },

    enablePlayerChoices() {
        const choices = document.querySelectorAll('.choice');
        choices.forEach(choice => {
            choice.style.pointerEvents = 'auto';
        })
    },

    startComputerAnimation() {
        this.animating = true;
        const computerImage = document.getElementById('computer-image');
        const computerCaption = document.getElementById('computer-caption');
        const resultsText = document.getElementById('results-text');
        resultsText.textContent = 'Computer is thinking...';
        computerImage.classList.add('thinking');
        let animationCount = 0;
        const totalAnimations = 6;
        const animationInterval = 500;
        this.animationInterval = setInterval(() => {
            const randomChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
            computerImage.src = `images/${randomChoice}.PNG`;
            computerCaption.textContent = 'Thinking...';
            animationCount++;

            if (animationCount >= totalAnimations) {
                clearInterval(this.animationInterval);
                this.finalizeComputerChoice();
            }
        }, animationInterval);
    },

    finalizeComputerChoice() {
        const computerImage = document.getElementById('computer-image');
        const computerCaption = document.getElementById('computer-caption');
        computerImage.classList.remove('thinking');
        this.computerChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
        computerImage.src = `images/${this.computerChoice}.PNG`;
        computerCaption.textContent = this.capitalizeFirstLetter(this.computerChoice);
        this.determineWinner();
        this.animating = false;
        this.enablePlayerChoices();
    },

    determineWinner() {
        const resultsText = document.getElementById('results-text');
        const playAgainButton = document.getElementById('play-again');
        if (this.playerChoice === this.computerChoice) {
            resultsText.textContent = "It's a tie!";
            this.ties++;
        } else if (
            (this.playerChoice === 'rock' && this.computerChoice === 'scissors') ||
            (this.playerChoice === 'paper' && this.computerChoice === 'rock') ||
            (this.playerChoice === 'scissors' && this.computerChoice === 'paper')
        ) {
            resultsText.textContent = 'You win!';
            this.wins++;
        } else {
            resultsText.textContent = 'Computer wins!';
            this.losses++;
        }

        playAgainButton.classList.remove('hidden');
        this.updateScoreDisplay();
    },

    resetGame() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.playerChoice = null;
        this.computerChoice = null;
        this.animating = false;
        const choices = document.querySelectorAll('.choice');
        choices.forEach(choice => {
            choice.classList.remove('selected');
            choice.style.pointerEvents = 'auto';
        });

        const computerImage = document.getElementById('computer-image');
        const computerCaption = document.getElementById('computer-caption');
        const resultsText = document.getElementById('results-text');
        const playAgainButton = document.getElementById('play-again');
        computerImage.src = 'images/question-mark.PNG';
        computerImage.classList.remove('thinking');
        computerCaption.textContent = 'Waiting...';
        resultsText.textContent = 'Choose your hand to start';
        playAgainButton.classList.add('hidden');
    },

    resetScore() {
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
        this.updateScoreDisplay();
        this.resetGame();
    },

    updateScoreDisplay() {
        document.getElementById('wins-count').textContent = this.wins;
        document.getElementById('losses-count').textContent = this.losses;
        document.getElementById('ties-count').textContent = this.ties;
    },

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    game.init();
});