import React from "react";

// Components must start with capital letters.
function Square({ value }) {
    function handleClick() {
        console.log("Clicked!");
    }

    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    );
}

export default function Board() {
    return (
        <React.Fragment>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
        </React.Fragment>
    );
}
