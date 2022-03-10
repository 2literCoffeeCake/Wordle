import * as React from 'react'
import { Navbar } from './Navbar';
import { Playground } from './Playground';

export class App extends React.Component<AppProps, any> {
    render() {
        return (
            <>
                <Navbar />
                <Playground />
            </>
        );
    }
}




interface AppProps {
    word: string;
    level: number;
}