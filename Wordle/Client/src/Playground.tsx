import * as React from 'react'
import { Helper } from './Helper';

export class Playground extends React.Component<PlaygroundProps, PlaygroundState> {

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
            this.props.onGameEnd(result);
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
            <div className="playground" style={{ gridTemplateColumns: `1fr ${this.props.level * 110}px 1fr` }}>
                <div>
                    {this.renderGuesses()}
                </div>
            </div>
        );
    }
}

interface PlaygroundProps {
    word: string;
    level: number;
    onGameEnd: (win: boolean) => void;
}

interface PlaygroundState {
    attempt: number;
}

class Guess extends React.Component<GuessProps, GuessState>{

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


interface Char {
    char: string;
    state: CharState;
}

enum CharState {
    Unknown,
    Present,
    Correct
}

class Letter extends React.Component<LetterProps, any>{


    private getClass = () => {
        let className = "letter " + (this.props.isActive ? "letter--active " : "");
        switch (this.props.char.state) {
            case CharState.Unknown:
                return className + "letter--unknown";
            case CharState.Present:
                return className + "letter--present";
            case CharState.Correct:
                return className + "letter--correct";
        }
    }

    render() {
        return (
            <div className={this.getClass()} style={{ gridRow: "1/2", gridColumn: `${this.props.pos + 1}/${this.props.pos + 2}` }}>
                {this.props.char.char}
            </div>
        );
    }

}

interface LetterProps {
    pos: number;
    char: Char;
    isActive: boolean;
}