import * as React from 'react'
import { Playground } from './Playground';
import { Timer } from './Timer';
import { Menu} from './Menu';

export class App extends React.Component<AppProps, AppState> {

    private timerRef: Timer;

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    private toggleMenu = (menuOpen: boolean) => {
        if (menuOpen) {
            this.timerRef.stopInterval();
        } else {
            this.timerRef.startInterval();
        }
        this.setState({ menuOpen: menuOpen })
    }

    private onGameEnd = (win: boolean) => {
        this.timerRef.stopInterval();

    }

    render() {
        return (
            <div className="app">
                <Menu
                    toggleMenu={this.toggleMenu}
                    open={this.state.menuOpen}
                />
                <div className="menuButton">
                    <svg viewBox="0 0 100 80" width="40" height="40" onClick={() => { this.toggleMenu(true) }}>
                        <rect width="100" height="10"></rect>
                        <rect y="30" width="100" height="10"></rect>
                        <rect y="60" width="100" height="10"></rect>
                    </svg>
                </div>                
                <div className="header">
                    Wordle
                </div>
                <Timer ref={(ref) => { this.timerRef = ref }} />
                <Playground level={this.props.level} word={this.props.word} onGameEnd={this.onGameEnd} />
            </div>
        );
    }
}

interface AppProps {
    word: string;
    level: number;
}

interface AppState {
    menuOpen: boolean;
}