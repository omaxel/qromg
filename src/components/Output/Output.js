import Button from 'components/Button/Button';
import React, { PureComponent } from 'react';
import { isNil } from 'utils';
import classes from './Output.module.scss';

export default class Output extends PureComponent {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.imageRef = React.createRef();
        this.linkRef = React.createRef();
    }

    downloadImage = () => {
        const canvas = this.canvasRef.current;
        const image = this.imageRef.current;
        const link = this.linkRef.current;

        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext('2d');

        context.drawImage(image, 0, 0);

        link.href = canvas.toDataURL('image/png').replace('data:image/png', 'data:application/octet-stream');
        link.click();
    }

    render() {
        const { imgSrc } = this.props;
        const hideImage = isNil(imgSrc) || imgSrc.length === 0;

        return (
            <div className={classes.root}>
                <a ref={this.linkRef} href='#' download='qrcode.png' hidden></a>

                <canvas ref={this.canvasRef} hidden></canvas>

                <div
                    className={classes.container}
                    hidden={hideImage}>

                    <img
                        ref={this.imageRef}
                        className={classes.img}
                        src={imgSrc}
                        alt='Generated QR Code' />

                    <Button
                        className={classes.btnDownload}
                        onClick={this.downloadImage}>
                        DOWNLOAD
                    </Button>
                </div>
            </div>);
    }
};