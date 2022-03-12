import * as React from 'react'

export class Menu extends React.Component<MenuProps, MenuState> {
    private actions: LabelAction[] = [
        {
            label: "Weiter spielen",
            action: () => {
                this.props.toggleMenu(false);
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
                this.setState({ mode: MenuMode.Settings });
            }
        }
    ];

    constructor(props) {
        super(props)
        this.state = {
            mode: MenuMode.Start
        }
    }

    private openMenu = () => {
        this.props.toggleMenu(true);
    }

    private renderMenu = () => {
        switch (this.state.mode) {
            case MenuMode.Start:
                return this.actions.map((action, index) => {
                    return (
                        <React.Fragment key={action.label}>
                            <div style={{ gridColumn: "2/3", gridRow: `${index + 2}/${index + 3}` }} onClick={action.action} className="menuItem">
                                {action.label}
                            </div>
                        </React.Fragment>
                    );
                });
            case MenuMode.Settings:
                return (
                    <>
                        <div style={{ gridColumn: "2/3", gridRow: "2/3" }} onClick={() => { this.setState({ mode: MenuMode.Start }) }} className="menuItem">
                            Zurück
                        </div>
                        <div style={{ gridColumn: "2/3", gridRow: "3/4" }} onClick={() => { this.setState({ mode: MenuMode.Start }) }} className="menuItem">
                            Zurück
                        </div>
                    </>
                );
                break;
        }

    }

    render() {
        return (
            <>
                <div className="menuButton" onClick={this.openMenu}>
                    menu
                </div>
                <div className={this.props.open ? "menu--open" : "menu--closed"}>
                    <div style={{ gridColumn: "2/3", gridRow: "1/2", fontSize: "55px" }}>
                        Menu
                    </div>
                    {this.renderMenu()}
                </div>
            </>
        );
    }
}

interface MenuProps {
    open: boolean;
    toggleMenu: (open: boolean) => void;
}

interface MenuState {
    mode: MenuMode
}

enum MenuMode {
    Start,
    Settings
}

interface LabelAction {
    label: string;
    action: () => void;
}