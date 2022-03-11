import * as React from 'react'

export class Menu extends React.Component<any, MenuState> {

    private actions: LabelAction[] = [
        {
            label: "Weiter spielen",
            action: () => {
                this.setState({open: false})
            }
        },
        {
            label: "Neues Spiel",
            action: () => {
            }
        },
        {
            label: "Rangliste",
            action: () => {
            }
        },
        {
            label: "Einstellungen",
            action: () => {
                this.setState({ open: false })
            }
        }
    ];

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    private openMenu = () => {
        this.setState({ open: true })
    }

    private generateLabels = () => {
        return this.actions.map((action, index) => {
            return (
                <React.Fragment key={action.label}>
                    <div style={{ gridColumn: "2/3", gridRow: `${index + 2}/${index + 3}` }} onClick={action.action} className="menuItem">
                        {action.label}
                    </div>
                </React.Fragment>
            );
        });
    }

    render() {
        return (
            <>
                <div className="menuButton" onClick={this.openMenu}>
                    Menu
                </div>
                <div className={this.state.open ? "menu--open" : "menu--closed"}>
                    <div style={{ gridColumn: "2/3", gridRow: "1/2", fontSize: "55px" }}>
                        Menu
                    </div>
                    {this.generateLabels()}
                </div>
            </>
        );
    }
}


interface MenuState {
    open: boolean;
}


interface LabelAction {
    label: string;
    action: () => void;
}