import React from "react";
import "./newStyles.css";

class Command extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: true,
            sent: false
        };
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent() {
        // this.value = !(this.value);
        this.setState({sent: !this.state.sent})
    }

    render() {
        return (
            <div>
                <label>Send command: </label>
                <button disabled={!this.props.ready} onClick={this.clickEvent}>
                    {(this.state.sent).toString()}
                </button>
            </div>
        );
    }
}

class TelemCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: true
        };
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent() {
        // this.value = !(this.value);
        this.setState({toggle: !this.state.toggle}, () => {
            this.props.onToggleChange(this.props.index, this.state.toggle);
        });
    }

    render() {
        return (
            <div>
                <label>{this.props.title}: </label>
                <button onClick={this.clickEvent}>
                    Set to {(!this.state.toggle).toString()}
                </button>
                {!this.state.toggle &&
                    <p style={{marginLeft: '20px'}}>Contingency message</p>
                }
            </div>
        );
    }
}

class ProcedureStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            telemChecks: [
                // <TelemCheck key="1" title="Stream 1"/>,
                // <TelemCheck key="2" title="Stream 2"/>
                {toggle: true},
                {toggle: true}
            ],
            commands: [
                <Command key="1" ready={false}/>
            ]
        };
        this.handleToggleChange = this.handleToggleChange.bind(this);
    }

    handleToggleChange(index, toggle) {
        const newTelemChecks = [...this.state.telemChecks];
        newTelemChecks[index] = {toggle: toggle};
        this.setState({telemChecks: newTelemChecks});
    }

    checkTelemStatus() {
        for (let i = 0; i < this.state.telemChecks.length; i++) {
            if (!this.state.telemChecks[i].toggle) {
                return false;
            }
        }
        return true;
    }
    
    render() {

        const commandsReady = this.checkTelemStatus();

        return (
            <div className="ProcedureStep">
                <div className="title">
                    <button>Flag</button>
                    <button>Notes</button>
                    <button>Docs</button>
                    Helllo
                </div>
                <div className="subSection">
                    <div className="sectionHeader">
                        TELEMETRY CHECKS
                    </div>
                    <div className="sectionBody">
                        {this.state.telemChecks.map((check, index) =>
                            <TelemCheck
                                key={index}
                                title={`Stream ${index+1}`}
                                index={index}
                                onToggleChange={this.handleToggleChange}
                            />
                        )}
                    </div>
                </div>
                <div className="subSection">
                    <div className="sectionHeader">
                        COMMANDS
                    </div>
                    <div className="sectionBody">
                        {this.state.commands.map(command =>
                            React.cloneElement(command, {ready: commandsReady})
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

class TopLevel extends React.Component {
    render() {
        return (
            <ProcedureStep stepID="2.130.3.7"/>
        )
    }
}

export default TopLevel;