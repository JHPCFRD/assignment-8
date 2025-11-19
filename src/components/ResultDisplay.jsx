/**
 * Name: Jay Park
 * Date: 11.13.2025
 * CSC 372-01
 *
 * Display result component.
 */

function ResultDisplay({ result, onPlayAgain }) {
  return (
    <div className="game-section">
      <h2>Results</h2>
      <p><strong>{result || 'Make your choice!'}</strong></p>
      {result && (
        <button onClick={onPlayAgain}>Play Again</button>
      )}
    </div>
  );
}

export default ResultDisplay;