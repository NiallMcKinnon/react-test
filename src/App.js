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
        // this.setState({sent: !this.state.sent})
        this.setState({sent: !this.state.sent}, () => {
            this.props.onCommandSend(this.props.index, this.state.sent);
        });
    }

    render() {
        return (
            <div>
                <label>Send command: </label>
                <button disabled={!this.props.ready} onClick={this.clickEvent}>
                    {(this.state.sent) ? "Sent" : "Not Sent"}
                </button>
            </div>
        );
    }
}

class TelemCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
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
                    {/* Set to {(!this.state.toggle).toString()} */}
                    {(this.state.toggle) ? "Nominal" : "Off-Nominal"}
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
            telemChecks: [{ toggle: false }, { toggle: false }],
            // commands: [<Command key="1" ready={false} />],
            commands: [{sent: false}],
            showDocs: false,
            showNotes: false,
            showFlag: false
        };
        this.handleToggleChange = this.handleToggleChange.bind(this);
        this.handleCommandSend = this.handleCommandSend.bind(this);
        this.showDocPanel = this.showDocPanel.bind(this);
        this.showNotesPanel = this.showNotesPanel.bind(this);
        this.showFlagPanel = this.showFlagPanel.bind(this);
    }

    handleToggleChange(index, toggle) {
        const newTelemChecks = [...this.state.telemChecks];
        newTelemChecks[index] = { toggle: toggle };
        this.setState({ telemChecks: newTelemChecks });
    }

    handleCommandSend(index, sent) {
        const newCommands = [...this.state.commands];
        newCommands[index] = {sent: sent};
        this.setState({commands: newCommands});
    }

    checkTelemStatus() {
        for (let i = 0; i < this.state.telemChecks.length; i++) {
            if (!this.state.telemChecks[i].toggle) {
                return false;
            }
        }
        return true;
    }

    checkCommandStatus() {
        for (let i = 0; i < this.state.commands.length; i++) {
            if (!this.state.commands[i].sent) {
                return false;
            }
        }
        return true;
    }

    showDocPanel() {
        this.setState({showDocs: !this.state.showDocs})
    }
    showFlagPanel() {
        this.setState({showFlag: !this.state.showFlag})
    }
    showNotesPanel() {
        this.setState({showNotes: !this.state.showNotes})
    }

    render() {
        const commandsReady = this.checkTelemStatus();
        const allCommandsSent = this.checkCommandStatus();

        return (
            <div className="ProcedureStep">

                <div className="title">
                    <button onClick={this.showFlagPanel}>Flag</button>
                    <button onClick={this.showNotesPanel}>Notes</button>
                    <button onClick={this.showDocPanel}>Docs</button>
                    Demo Procedure Step
                </div>

                { this.state.showDocs ? 
                    <div className="docsSection">
                        <div className="sectionHeader">DOCUMENTATION</div>
                        <div className="sectionBody">
                            Documentation
                        </div>
                    </div>
                : null}

                { this.state.showNotes ? 
                    <div className="notesSection">
                        <div className="sectionHeader">NOTES</div>
                        <div className="sectionBody">
                            Notes
                        </div>
                    </div>
                : null}

                { this.state.showFlag ? 
                    <div className="flagSection">
                        <div className="sectionHeader">ADD NOTE</div>
                        <div className="sectionBody">
                            Add new note
                        </div>
                    </div>
                : null}

                <div className="subSection">
                    <div className="sectionHeader">TELEMETRY CHECKS</div>
                    <div className="sectionBody">
                        {this.state.telemChecks.map((check, index) => (
                            <TelemCheck
                                key={index}
                                title={`Stream ${index + 1}`}
                                index={index}
                                onToggleChange={this.handleToggleChange}
                            />
                        ))}
                    </div>
                </div>

                <div className="subSection">
                    <div className="sectionHeader">COMMANDS</div>
                    <div className="sectionBody">
                        {this.state.commands.map((check, index) => (
                            <Command
                                key={index}
                                ready={commandsReady}
                                index={index}
                                onCommandSend={this.handleCommandSend}
                            />
                        ))}
                    </div>
                </div>

                <div className="subSection">
                    <button disabled={!allCommandsSent}>Proceed to next step</button>
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