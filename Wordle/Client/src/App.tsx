import * as React from 'react'
import { Playground } from './Playground';
import { Timer } from './Timer';
import { Menu } from './Menu';

export class App extends React.Component<AppProps, any> {
    render() {
        return (
            <div className="app">
                <Menu />
                <div className="header">
                    Wordle
                </div>
                <Timer />
                <Playground />
            </div>
        );
    }
}

interface AppProps {
    word: string;
    level: number;
}