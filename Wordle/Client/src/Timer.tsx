﻿import * as React from 'react'

export class Timer extends React.Component<any, TimerState>{
    private intervalTocken: NodeJS.Timer;

    constructor(props) {
        super(props);
        this.state = {
            timer: 0
        }
    }

    private incrementTimer = () => {
        const timer = this.state.timer;
        this.setState({ timer: timer + 1 });
    }

    resetInterval = () => {
        this.setState({ timer: 0 });
    }

    stopInterval = () => {
        clearInterval(this.intervalTocken);
    }

    startInterval = () => {
        this.intervalTocken = setInterval(this.incrementTimer, 1000);
    }

    componentWillUnmount() {
        this.stopInterval();
    }

    componentDidMount() {
        this.startInterval();
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
            <div className="timer">
                {minutes}:{secunds}
            </div>
        );
    }
}

interface TimerState {
    timer: number;
}