import * as React from 'react';
import { Helper } from './Helper'
import { ToggleButton } from './components/ToggleButton';

export class Menu extends React.Component<MenuProps, MenuState> {
    constructor(props) {
        super(props)
        this.state = {
            mode: MenuMode.Start,
            displayMode: Helper.readFromClientStorage<"dark"|"light">("Style", "dark")
        }
    }

    private openMenu = () => {
        this.props.toggleMenu(true);
    }

    private toggleStyle = (value: boolean) => {
        this.setState({ displayMode: value ? "dark" : "light" }, () => {
            Helper.toggleStyle(value ? "dark" : "light");
        });
    }

    private changeName = async () => {
        const currentName = Helper.readFromClientStorage<string>(Helper.ClientStorageKeys.UserName, "Max Mustername Unleashed");
        const name = await Helper.prompt<string>("Name eingeben", currentName);
        if (!Helper.isEmpty(name) && name.trim() !== "") {
            Helper.saveToClientStorage(Helper.ClientStorageKeys.UserName, name);
        }
    }

    private renderMenu = () => {
        switch (this.state.mode) {
            case MenuMode.Start:
                return this.renderStart();
            case MenuMode.Settings:
                return this.renderSettings();
        }
    }

    private renderStart = () => {
        return (
            <>
                <div style={{ gridColumn: "2/3", gridRow: "2/3" }} onClick={() => { this.props.toggleMenu(false)}} className="menuItem">
                    Weiter spielen
                </div>
                <div style={{ gridColumn: "2/3", gridRow: "3/4" }} onClick={() => {  }} className="menuItem">
                    Neues Spiel
                </div>
                <div style={{ gridColumn: "2/3", gridRow: "4/5" }} onClick={() => { }} className="menuItem">
                    Rangliste
                </div>
                <div style={{ gridColumn: "2/3", gridRow: "5/6" }} onClick={() => { this.setState({ mode: MenuMode.Settings }) }} className="menuItem">
                    Einstellungen
                </div>
            </>
        );
    }

    private renderSettings = () => {
        return (
            <>
                <div style={{ gridColumn: "2/3", gridRow: "2/3" }} onClick={this.changeName} className="menuItem">
                    Namen ändern
                </div>
                <div style={{ gridColumn: "2/3", gridRow: "3/4" }}>
                    <ToggleButton value={this.state.displayMode === 'dark'} onChange={this.toggleStyle} />
                </div>
                <div style={{ gridColumn: "2/3", gridRow: "4/5" }} onClick={() => { this.setState({ mode: MenuMode.Start }) }} className="menuItem">
                    Zurück
                </div>
            </>
        );
    }

    render() {
        return (
            <>
                <div className="menuButton">
                    <svg viewBox="0 0 100 80" width="40" height="40" onClick={this.openMenu}>
                        <rect width="100" height="10"></rect>
                        <rect y="30" width="100" height="10"></rect>
                        <rect y="60" width="100" height="10"></rect>
                    </svg>
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
    mode: MenuMode,
    displayMode: "dark"|"light" 
}

enum MenuMode {
    Start,
    Settings
}

interface LabelAction {
    label: string;
    action: () => void;
}