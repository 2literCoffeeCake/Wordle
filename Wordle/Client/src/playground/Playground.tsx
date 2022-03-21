import * as React from 'react'
import { Guess } from './Guess';
import { Timer } from './Timer';

export class Playground extends React.Component<PlaygroundProps, PlaygroundState> {

    private timerRef: Timer;

    constructor(props) {
        super(props)
        this.state = {
            attempt: 0
        }
    }

    private onGuessEnd = (guess: string) => {
        const result = guess === this.props.word.toUpperCase();
        const attempt = this.state.attempt + 1
        if (attempt < 6) {
            this.setState({ attempt: attempt });
        } else {
            //this.props.onGameEnd(result);
        }
        return result;
    }

    private renderGuesses = () => {
        const guesses = [];

        for (let i = 0; i < 6; i++) {
            guesses.push(
                <React.Fragment key={`guess_${i}`}>
                    <Guess
                        attempt={this.state.attempt}
                        level={this.props.level}
                        word={this.props.word}
                        onGuessEnd={this.onGuessEnd}
                        isActive={this.state.attempt == i}
                    />
                </React.Fragment>
            );

        }
        return guesses;
    }

    render() {
        return (
            <div className="playground" style={{ gridTemplateColumns: `1fr ${this.props.level * 90}px 1fr` }}>
                <Timer ref={(ref) => { this.timerRef = ref }} />
                <div className="field">
                    {this.renderGuesses()}
                </div>
            </div>
        );
    }
}

interface PlaygroundProps {
    word: string;
    level: number;
}

interface PlaygroundState {
    attempt: number;
}