import React from 'react';
import { clampNumber, classNames, isNil } from '../../utils';
import classes from './ProgressBar.module.scss';

const maxValue = 100;
const minValue = 0;

const ProgressBar = ({ className = '', progress, ...rest }) => {

    const isIndeterminate = isNil(progress);

    let primaryFillStyle = null;
    if (!isIndeterminate) {
        const progressValue = clampNumber(progress, minValue, maxValue);
        primaryFillStyle = { transform: `scaleX(${(progressValue / 100).toFixed(4)})` };
    }

    return (
        <div
            className={classNames(classes.root, className)}
            role='progressbar'
            mode={isIndeterminate ? 'indeterminate' : 'determinate'}
            aria-valuenow={progress}
            aria-valuemax={maxValue}
            aria-valuemin={minValue}
            {...rest}>
            <div className={classNames(classes.fill, classes.fillPrimary)} style={primaryFillStyle}></div>
            <div className={classNames(classes.fill, classes.fillSecondary)}></div>
        </div>
    );
}

export default ProgressBar;