import React, { Component } from 'react';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import ToastContext from '../Snackbar/snackbarContext';
import classes from './InputBox.module.scss';

export default class InputBox extends Component {
    state = {
        inputValue: 'https://omarmuscatello.github.io/qromg/'
    }

    static contextType = ToastContext;

    inputElemRef = React.createRef();

    inputChangeHandler = ({ currentTarget }) => {
        this.setState({ inputValue: currentTarget.value });
    }

    formSubmitHandler = event => {
        event.preventDefault();

        // Focus input if nothing has been typed
        if (this.state.inputValue === '') {
            this.inputElemRef.current.focus();
            return;
        }

        // TODO: handle input validation

        this.props.generateHandler(this.state.inputValue);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.inputValue !== nextState.inputValue || this.props.generating !== nextProps.generating;
    }

    render() {
        return (
            <div className={classes.root}>
                <form className={classes.form} onSubmit={this.formSubmitHandler}>
                    <input
                        aria-label='Input text'
                        className={classes.input}
                        type='text'
                        autoComplete='off'
                        onChange={this.inputChangeHandler}
                        value={this.state.inputValue}
                        disabled={this.props.generating}
                        ref={this.inputElemRef}
                        placeholder='Type text here' />

                    <Button
                        type='submit'
                        className={classes.btnGenerate}
                        disabled={this.props.generating}>
                        GENERATE!
                    </Button>
                </form>

                <ProgressBar className={classes.progressBar} hidden={!this.props.generating} />
            </div>
        );
    }
}