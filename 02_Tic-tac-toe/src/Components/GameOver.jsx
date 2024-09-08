export default function GameOver({winner, onRestart}){
    return <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>} {/* only show if winner is truthy (not undefined or null) */}
        {!winner && <p>It's a draw!</p>} {/* show if "winner" is null */}
        <p>
            <button onClick={onRestart}>Rematch!</button>
        </p>
    </div>
}