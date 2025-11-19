/**
 * Name: Jay Park
 * Date: 11.13.2025
 * CSC 372-01
 *
 * Reset button component.
 */

function ResetButton({ onReset }) {
  return (
    <div className="game-section">
      <button onClick={onReset}>Reset Score</button>
    </div>
  );
}

export default ResetButton;