import * as ReactDOM from 'react-dom';
import * as React from 'react'
import { App } from './App'


function build() {
    const root = document.getElementById("root"); 
    function getAttribute<T>(name: string){
        const result = root.getAttribute(`data-${name}`);
        root.removeAttribute(`data-${name}`);
        return result as unknown as T;
    }
    const word = getAttribute<string>("word");
    const level = getAttribute<number>("level");
    ReactDOM.render(<App level={level} word={ word } />, root);
}

document.addEventListener("DOMContentLoaded", build);


