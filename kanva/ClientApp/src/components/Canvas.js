import React, {Component} from "react";
import html2canvas from "html2canvas";
import {ReactPainter} from "react-painter";
import {FormGroup, Input} from "reactstrap";

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            brushWidth: Math.log(5)
        };
    }

    onSave = (blob) => {
        const target = document.getElementById('Kanva').children[0];
        console.log(blob);
        html2canvas(target, {
            scale: 1,
            logging: false,
            scrollX: 0,
            scrollY: 30,
            allowTaint: false,
        }).then((canvas) => {
            let context = canvas.getContext('2d');

            let imageData = context.getImageData(0, 0, canvas.width, canvas.height)

            fetch('/api/kanva', {
                method: 'POST',
                body: JSON.stringify(imageData.data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });
    };

    onChangeLineWidth = (onChange) => (event) => {
        onChange(Math.exp(event.target.value));
        this.setState({brushWidth: Math.log(Math.exp(event.target.value))})
    };

    onChangeColor = (onChange) => (event) => {
        onChange(event.target.value);
    };

    onChangeLineJoin = (onChange) => (event) => {
        onChange(event.target.value);
    };

    onChangeLineCap = (onChange) => (event) => {
        onChange(event.target.value);
    };

    render() {
        const {brushWidth} = this.state
        return (
            <div className="m-auto text-center">
                <ReactPainter
                    width={1200}
                    height={600}
                    onSave={this.onSave}
                    render={({ triggerSave, canvas, setColor, setLineWidth, setLineJoin, setLineCap }) => (
                        <div id="document_root">
                            <FormGroup className="d-flex align-items-center">
                                <Input
                                    type="button"
                                    onClick={triggerSave}
                                    data-html2canvas-ignore="true"
                                    className="btn btn-success me-5 mb-2"
                                    value="Save Canvas"
                                />
                                <Input
                                    className="me-5 mb-2 p-0"
                                    type="color"
                                    onChange={this.onChangeColor(setColor)}
                                    data-html2canvas-ignore="true"
                                />
                                <Input
                                    className="me-5 mb-2"
                                    type="range"
                                    min="0.1"
                                    max="6.5"
                                    value={brushWidth}
                                    step="0.01"
                                    onChange={this.onChangeLineWidth(setLineWidth)}
                                    data-html2canvas-ignore="true"
                                />

                                <Input
                                    type="select"
                                    className="me-5 mb-2"
                                    onChange={this.onChangeLineJoin(setLineJoin)}
                                    data-html2canvas-ignore="true"
                                >
                                    <option value="round">round</option>
                                    <option value="bevel">bevel</option>
                                    <option value="miter">miter</option>
                                </Input>

                                <Input
                                    type="select"
                                    className="mb-2"
                                    onChange={this.onChangeLineCap(setLineCap)}
                                    data-html2canvas-ignore="true"
                                >
                                    <option value="round">round</option>
                                    <option value="butt">butt</option>
                                    <option value="square">square</option>
                                </Input>
                            </FormGroup>

                            <div
                                className="canvas-container p-o m-auto"
                                id="Kanva"
                                style={{
                                    border: '2px solid black',
                                    position: 'relative',
                                    width: '1204px',
                                    height: '604px',
                                }}
                            >
                                {canvas}
                            </div>
                        </div>
                    )}
                />
                {this.state.image && (
                    <img
                        src={this.state.image}
                        alt="from blob"
                        style={{
                            width: '602px',
                            height: '340px',
                            position: 'absolute',
                            left: '1px',
                        }}
                    />
                )}
            </div>
        );
    }
}