export default function GameBoard({ onSelectSquare, board }) {

    // We are removing the following code because we will "UPLIFT" it, and send it to APP component. This
    // is because the Parent component can then send information to both children that need it as props.
    // Because now this information needs to be available for both GameBoard and Log components. (Also because
    // Player component derives the activePlayer state from the function (onSelectSquare) called from GameBoard).

    // const [gameBoard, setGameBoard]= useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedBoard = [...prevGameBoard.map(innerarray=> [...innerarray])];
    //         // THIS IS IMPORTANT. Since when we are updating ojects or arrays in JS, any
    //         // change would update the reference value. We should create a copy first. Or errors might follow if 
    //         // we have different places in our applications that are scheduling changes to the initial state.

    //         // ALSO : [...prevGameBoard.map(innerarray=> [...innerarray])] is needed because if you only use 
    //         // [...prevGameBoard], you are making a copy of the outer array BUT the inner array would still be references
    //         // to the original array, so prevGameBoard would also be modified.
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }

    return <ol id="game-board">
        {board.map((row, rowIndex) =>
            <li key={rowIndex}>
                <ol>
                    {row.map((symbol, colIndex) =>
                        <li key={colIndex}>
                            <button
                                onClick={() => onSelectSquare(rowIndex, colIndex)}
                                disabled={symbol === "X" || symbol === "O"}>
                                {symbol} </button>
                        </li>)}
                </ol>
            </li>)}
    </ol>
}