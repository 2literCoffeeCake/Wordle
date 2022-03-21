import * as React from 'react'

export class Letter extends React.Component<LetterProps, any>{

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

export interface Char {
    char: string;
    state: CharState;
}

export enum CharState {
    Unknown,
    Present,
    Correct
}