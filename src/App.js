import React from "react";
// Returns a component:
export default function Square() {
    // return <button className="square">X</button>;
    return (
        <React.Fragment>
            <button className="square">X</button>
            <button className="square">X</button>
            <button className="square">X</button>
        </React.Fragment>
    );
}
