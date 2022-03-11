import * as React from 'react'
import { Navbar } from './Navbar';
import { Playground } from './Playground';

export class App extends React.Component<AppProps, any> {
    render() {
        return (
            <div className="app">
                <Navbar />
                <Playground />
            </div>
        );
    }
}

                //
                //


interface AppProps {
    word: string;
    level: number;
}