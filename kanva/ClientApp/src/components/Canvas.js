import React, {Component} from "react";
import {Editor} from './Editor';

export class Canvas extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return <div className="m-auto text-center">
            <Editor/>
        </div>
    }
}