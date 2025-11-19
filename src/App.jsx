/**
 * Name: Jay Park
 * Date: 11.13.2025
 * CSC 372-01
 *
 * Main App component for the Rock-Paper-Scissors React game.
 */

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlayerThrow from './components/PlayerThrow'
import ComputerThrow from './components/ComputerThrow'
import ResultDisplay from './components/ResultDisplay'
import ScoreBoard from './components/ScoreBoard'
import ResetButton from './components/ResetButton'

function App() {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [scores, setScores] = useState({ wins: 0, losses: 0, ties: 0 })

  const choices = ['rock', 'paper', 'scissors']

  const handlePlayerChoice = (choice) => {
    if (isAnimating) return;
    setPlayerChoice(choice);
    setIsAnimating(true);
    setComputerChoice(null);
    setResult('');
  };

  useEffect(() => {
    if (!isAnimating) return;

    let count = 0;
    const interval = setInterval(() => {
      const random = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(random);
      count++;

      if (count >= 6) {
        clearInterval(interval);
        const finalChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(finalChoice);
        setIsAnimating(false);

        if (playerChoice === finalChoice) {
          setResult('Tie game!');
          setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
        } else if (
          (playerChoice === 'rock' && finalChoice === 'scissors') ||
          (playerChoice === 'paper' && finalChoice === 'rock') ||
          (playerChoice === 'scissors' && finalChoice === 'paper')
        ) {
          setResult('You win!');
          setScores(prev => ({ ...prev, wins: prev.wins + 1 }));
        } else {
          setResult('Computer wins!');
          setScores(prev => ({ ...prev, losses: prev.losses + 1 }));
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isAnimating, playerChoice]);

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult('')
    setIsAnimating(false)
  }

  const resetScore = () => {
    setScores({ wins: 0, losses: 0, ties: 0 })
    resetGame()
  }

  return (
    <>


      <h1>Rock Paper Scissors</h1>

      <div className="card">
        <PlayerThrow
          playerChoice={playerChoice}
          onChoice={handlePlayerChoice}
          isAnimating={isAnimating}
        />

        <ComputerThrow
          computerChoice={computerChoice}
          isAnimating={isAnimating}
          gameStarted={!!playerChoice}
        />

        <ResultDisplay
          result={result}
          onPlayAgain={resetGame}
        />
        <ScoreBoard scores={scores} />


        <ResetButton onReset={resetScore} />
      </div>

      <p className="read-the-docs">
        Click on the rock, paper, or scissors to play
      </p>
      
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App