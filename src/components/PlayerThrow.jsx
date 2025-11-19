/**
 * Name: Jay Park
 * Date: 11.13.2025
 * CSC 372-01
 *
 * Player throw selection component.
 */

function PlayerThrow({ playerChoice, onChoice, isAnimating }) {
  const choices = [
    { id: 'rock', alt: 'Rock', src: '/images/rock.PNG' },
    { id: 'paper', alt: 'Paper', src: '/images/paper.PNG' },
    { id: 'scissors', alt: 'Scissors', src: '/images/scissors.PNG' }
  ];

  return (
    <div className="game-section">
      <h2>Your Throw</h2>
      <div className="choices">
        {choices.map(choice => (
          <button 
            key={choice.id}
            className={playerChoice === choice.id ? 'selected' : ''}
            onClick={() => onChoice(choice.id)}
            disabled={isAnimating}
          >
            <img src={choice.src} alt={choice.alt} width="50" />
            {choice.id}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlayerThrow;