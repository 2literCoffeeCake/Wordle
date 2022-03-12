import * as React from 'react'

export class ToggleButton extends React.Component<ToggleButtonProps, any>{



    render() {
        return (
            <>
                <label className="switch">
                    <input type="checkbox" checked={this.props.value} onChange={(e) => { this.props.onChange(e.target.checked) }} />
                        <span className="slider round"></span>
                </label>
            </>
        );
    }   
}

export interface ToggleButtonProps {
    value: boolean;
    onChange: (value: boolean) => void;
}