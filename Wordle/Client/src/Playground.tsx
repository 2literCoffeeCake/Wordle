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
        if (attempt < this.props.level) {
            this.setState({ attempt: attempt });
        } else {
            this.props.onGameEnd(result);
        }
        return result;
    }

    private renderGuesses = () => {
        const guesses = [];

        for (let i = 0; i < this.state.attempt + 1; i++) {
            guesses.push(
                <React.Fragment key={`guess_${i}`}>
                    <Guess
                        attempt={this.state.attempt}
                        level={this.props.level}
                        word={this.props.word}
                        onGuessEnd={this.onGuessEnd}
                    />
                </React.Fragment>
            );

        }
        return guesses;
    }

    render() {
        return (
            <div className="playground">
                {this.renderGuesses()}
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
            chars: []
        }
    }


    private onKeyPress = (event: KeyboardEvent) => {
        //const backspace = 8;
        const a = 65;
        const z = 90;

        if (event.keyCode >= a && event.keyCode <= z) {
            this.addChar(event.key.toUpperCase())
        } 
    }

    private addChar = (char: string) => {
        if (this.state.chars.length < this.props.level) {
            const chars = this.state.chars;
            chars.push({
                char: char[0],
                state: CharState.Unknown
            });
            this.setState({ chars: chars }, () => {
                if (this.state.chars.length >= this.props.level) {
                    document.removeEventListener("keydown", this.onKeyPress);
                    this.setState({ chars: PlaygroundHelper.compareChars(this.state.chars, this.props.word) }, () => {
                        const guess = this.state.chars.map((c) => { return c.char }).join("").toUpperCase();
                        this.props.onGuessEnd(guess);

                    });
                }
            });
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPress)
    }

    private mapChar = (char: Char, pos: number) => {
        return (
            <React.Fragment key={`${this.props.attempt}_${char}_${pos}`}>
                <Letter char={char} pos={pos + 1} />
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className="guess" style={{ gridTemplateColumns: `repeat(${this.props.level}, 1fr)` }}>
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
}

interface GuessState {
    chars: Char[];
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
        switch (this.props.char.state) {
            case CharState.Unknown:
                return "letter letter--unknown";
            case CharState.Present:
                return "letter letter--present";
            case CharState.Correct:
                return "letter letter--correct";
        }
    }

    render() {
        return (
            <div className={this.getClass()} style={{ gridColumn: `${this.props.pos}/${this.props.pos + 1}` }}>
                <div>
                    {this.props.char.char}
                </div>
            </div>
        );
    }

}

interface LetterProps {
    pos: number;
    char: Char;
}