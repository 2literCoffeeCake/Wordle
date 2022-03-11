import * as React from 'react'

export class Playground extends React.Component<any, any> {
    






    render() {

        return (
            <div className="playground">
                <Timer />
                <div>
                </div>
            </div>
        );
    }
}

class Timer extends React.Component<any, TimerState>{
    private intervalTocken: NodeJS.Timer;

    constructor(props) {
        super(props);
        this.state = {
            timer: 0
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalTocken);
    }

    private incrementTimer = () => {
        const timer = this.state.timer;
        this.setState({timer: timer + 1});
    }

    componentDidMount() {
        this.intervalTocken = setInterval(this.incrementTimer, 1000);
    }

    private parseInt = (value: number) => {
        value = Math.trunc(value);
        if (value < 10) {
            return `0${value}`;
        }
        return value.toString();
    }

    render() {
        const minutes = this.parseInt(this.state.timer / 60);
        const secunds = this.parseInt(this.state.timer % 60);

        return (
            <div>
                {minutes}:{secunds}
            </div>
        );
    }
}

interface TimerState {
    timer: number;
}