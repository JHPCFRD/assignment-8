/**
 * Name: Jay Park
 * Date: 11.13.2025
 * CSC 372-01
 *
 * Computer throw component.
 */

function ComputerThrow({ computerChoice, isAnimating, gameStarted }) {
  return (
    <div className="game-section">
      <h2>Computer Throw</h2>
      <div className="computer">
        <img 
          src={computerChoice ? `/images/${computerChoice}.PNG` : '/images/question-mark.PNG'} 
          alt="computer choice" 
          width="80"
          className={isAnimating ? 'thinking' : ''}
        />
        <p>{computerChoice ? computerChoice : (gameStarted ? 'Thinking...' : 'Waiting...')}</p>
      </div>
    </div>
  );
}

export default ComputerThrow;