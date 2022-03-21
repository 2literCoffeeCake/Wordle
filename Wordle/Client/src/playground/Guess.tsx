import * as React from 'react'
import { Helper } from '../Helper';
import { Char, CharState, Letter } from './Letter';

export class Guess extends React.Component<GuessProps, GuessState>{

    constructor(props) {
        super(props);
        this.state = {
            chars: Array(this.props.level).fill("").map((char) => {
                return {
                    char: char,
                    state: CharState.Unknown
                }
            }),
            index: 0
        }
    }


    private onKeyPress = (event: KeyboardEvent) => {
        const a = 65;
        const z = 90;

        if (event.keyCode >= a && event.keyCode <= z && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            this.addChar(event.key.toUpperCase())
        }
    }

    private addChar = (char: string) => {
        if (this.state.index < this.props.level) {
            let chars = this.state.chars;
            chars[this.state.index] = {
                char: char,
                state: CharState.Unknown
            };
            this.setState({ chars: chars, index: this.state.index + 1 }, () => {
                if (this.state.index >= this.props.level) {
                    this.removeEventListener();
                    this.setState({ chars: PlaygroundHelper.compareChars(this.state.chars, this.props.word) }, () => {
                        const guess = this.state.chars.map((c) => { return c.char }).join("").toUpperCase();
                        this.props.onGuessEnd(guess);

                    });
                }
            });
        }
    }

    componentDidMount() {
        if (this.props.isActive)
            this.addEventListener()
    }

    componentDidUpdate() {
        if (this.props.isActive)
            this.addEventListener()
        else
            this.removeEventListener();
    }

    componentWillUnmount() {
        this.removeEventListener();
    }

    private removeEventListener = () => {
        document.removeEventListener("keydown", this.onKeyPress)
    }

    private addEventListener = () => {
        document.addEventListener("keydown", this.onKeyPress)
    }

    private mapChar = (char: Char, pos: number) => {
        return (
            <React.Fragment key={`letter_${this.props.attempt}_${pos}`}>
                <Letter char={char} pos={pos} isActive={pos == this.state.index && this.props.isActive} />
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className={`guess ${this.props.isActive ? "guess--active" : ""}`} style={{ gridTemplateColumns: `repeat(${this.props.level}, 1fr)` }}>
                {this.state.chars.map(this.mapChar)}
            </div>
        );
    }

}


interface GuessProps {
    word: string;
    level: number;
    attempt: number;
    onGuessEnd: (guess: string) => boolean;
    isActive: boolean;
}

interface GuessState {
    chars: Char[];
    index: number;
}

class PlaygroundHelper {
    public static compareChars = (chars: Char[], word: string) => {
        const letters = word.split('');
        const indexes = [];

        for (let i = 0; i < chars.length; i++) {
            if (chars[i].char.toUpperCase() === letters[i].toUpperCase()) {
                chars[i].state = CharState.Correct;
                letters[i] = "";
            } else {
                indexes.push(i);
            }
        }

        for (let i = 0; i < chars.length; i++) {
            const value = indexes.find(f => f == i);
            if (!Helper.isEmpty(value)) {
                const index = letters.findIndex(f => f.toUpperCase() == chars[i].char.toUpperCase());
                if (index > -1) {
                    chars[i].state = CharState.Present;
                    letters[index] = "";
                }
            }
        }

        return chars;
    }
}