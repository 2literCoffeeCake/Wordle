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

    render() {
        return (
            <div className="app">
                <Menu
                    toggleMenu={this.toggleMenu}
                    open={this.state.menuOpen}
                />
                <div className="header">
                    Wordle
                </div>
                <Timer ref={(ref) => { this.timerRef = ref }} />
                <Playground />
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