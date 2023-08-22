import {useCallback, useState, Fragment} from 'react';
import {ReactPainter} from 'react-painter';
import html2canvas from 'html2canvas';

export const Editor = () => {
    const [image, setImage] = useState(null);

    const onSave = useCallback((blob) => {
        const target = document.getElementById('document_root');
        console.log(blob);
        html2canvas(target, {
            scale: 1,
            logging: false,
            scrollX: 0,
            scrollY: 30,
            allowTaint: false
        }).then((canvas) => {
            let context = canvas.getContext('2d');

            let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            console.log(imageData.data)
            fetch('/ccc', {method: "POST", body: imageData.data})

            const base64image = canvas.toDataURL('image/png', 1);
            setImage(base64image);
        });
    }, []);

    const onChangeLineWidth = useCallback(
        (onChange) => (event) => {
            onChange(event.target.value);
        },
        []
    );

    const onChangeColor = useCallback(
        (onChange) => (event) => {
            onChange(event.target.value);
        },
        []
    );

    const onChangeLineJoin = useCallback(
        (onChange) => (event) => {
            onChange(event.target.value);
        },
        []
    );

    const onChangeLineCap = useCallback(
        (onChange) => (event) => {
            onChange(event.target.value);
        },
        []
    );

    const classes = ({
        root: {
            width: '602px',
            height: '340px',
            boxSizing: 'border-box'
        },
        content: {
            position: 'relative',
            width: '600px',
            height: '270px'
        },
        canvas: {
            position: 'absolute',
            border: '1px solid red',
            top: '160px',
            left: '1px'
        },
        ctrl: {
            display: 'flex',
            flexDirection: 'row',
            height: '27px'
        }
    });

    return (
        <Fragment>
            <ReactPainter
                width={1200}
                height={600}
                onSave={onSave}
                render={({
                             triggerSave,
                             canvas,
                             setColor,
                             setLineWidth,
                             setLineJoin,
                             setLineCap
                         }) => (
                    <div className={classes.root} id="document_root">
                        <div className={classes.ctrl}>
                            <button onClick={triggerSave} data-html2canvas-ignore="true">
                                Save Canvas
                            </button>
                            <input
                                type="color"
                                onChange={onChangeColor(setColor)}
                                data-html2canvas-ignore="true"
                            />
                            <input
                                type="number"
                                onChange={onChangeLineWidth(setLineWidth)}
                                data-html2canvas-ignore="true"
                            />
                            <select
                                onChange={onChangeLineJoin(setLineJoin)}
                                data-html2canvas-ignore="true"
                            >
                                <option value="round">round</option>
                                <option value="bevel">bevel</option>
                                <option value="miter">miter</option>
                            </select>
                            <select
                                onChange={onChangeLineCap(setLineCap)}
                                data-html2canvas-ignore="true"
                            >
                                <option value="round">round</option>
                                <option value="butt">butt</option>
                                <option value="square">square</option>
                            </select>
                        </div>

                        <div className={classes.canvas}>{canvas}</div>
                    </div>
                )}
            />
            {image && (
                <img
                    src={image}
                    alt="from blob"
                    style={{
                        width: '602px',
                        height: '340px',
                        position: 'absolute',
                        left: '1px'
                    }}
                />
            )}
        </Fragment>
    );
};
