import React from "react";
// Returns a component:
export default function Square() {
    // return <button className="square">X</button>;
    return (
        <React.Fragment>
            <div className="board-row">
                <button className="square">X</button>
                <button className="square">X</button>
                <button className="square">X</button>
            </div>
            <div className="board-row">
                <button className="square">X</button>
                <button className="square">X</button>
                <button className="square">X</button>
            </div>
            <div className="board-row">
                <button className="square">X</button>
                <button className="square">X</button>
                <button className="square">X</button>
            </div>
        </React.Fragment>
    );
}
