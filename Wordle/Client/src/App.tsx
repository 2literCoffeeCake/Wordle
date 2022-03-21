import * as React from 'react'
import { Playground } from './playground/Playground';
import { Navbar } from './navbar/Navbar';

export class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    render() {
        return (
            <div className="app">
                <Navbar />
                <Playground level={this.props.level} word={this.props.word}/>
            </div>
        );
    }
}

/*
                

                 <div className="menuButton">
                    <svg viewBox="0 0 100 80" width="40" height="40" onClick={() => { this.toggleMenu(true) }}>
                        <rect width="100" height="10"></rect>
                        <rect y="30" width="100" height="10"></rect>
                        <rect y="60" width="100" height="10"></rect>
                    </svg>
                </div>     
 
 */ 


interface AppProps {
    word: string;
    level: number;
}

interface AppState {
    menuOpen: boolean;
}