/**
 * Name: Jay Park
 * Date: 11.13.2025
 * CSC 372-01
 *
 * Score board component
 */

function ScoreBoard({ scores }) {
  return (
    <div className="game-section">
      <h2>Scoreboard</h2>
      <div className="scores">
        <span>Wins: {scores.wins}</span> | 
        <span> Losses: {scores.losses}</span> | 
        <span> Ties: {scores.ties}</span>
      </div>
    </div>
  );
}

export default ScoreBoard;