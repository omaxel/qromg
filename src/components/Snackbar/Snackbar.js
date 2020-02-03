import React, { Component, createRef } from 'react';
import { classNames, transitionEndEventName } from '../../utils';
import classes from './Snackbar.module.scss';
import SnackbarContext from './snackbarContext';

const defaultHideDelay = 4000;

class Snackbar extends Component {

    /**
     * `visible`: It indicates if the Snackbar should be displayed or not.
     * 
     * `message`: An object which describes the message to show in the Snackbar. It's set to `null` only at init time. 
     */
    state = {
        visible: false,
        message: null
    }

    constructor(props) {
        super(props);
        this.rootRef = createRef();
    }

    componentDidUpdate() {
        /** If the Snackbar is visible, change its state to not visible after the specified amount of time. Once the hiding transition is completed,
         * call the related callback.
         */
        if (this.state.visible) {
            setTimeout(() => {
                this.rootRef.current.addEventListener(transitionEndEventName, this.props.onHideComplete, { once: true });
                this.setState({ visible: false });
            }, this.state.message.hideDelay ?? defaultHideDelay);
        }
    }

    static getDerivedStateFromProps(props, state) {

        /** Show the snackbar and update the state.message only if the props.message has changed and it has been specified.
         * Since we update the 'visible' property of the state to 'false' and this lifecycle hook is called also when
         * setState is invoked, we want to avoid that we overwrite the 'visible' property. That's why the message is also stored into the state.
         * 
         * We check that 'props.message' is not null because if the already shown message (state.message) is already set and the new message (props.message) is equal to null
         * we don't want to show the Snackbar with null value. So,
         */
        if (props.message !== state.message && props.message !== null) {
            return { visible: true, message: props.message };
        }

        return state;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.message !== nextState.message || this.state.visible !== nextState.visible;
    }

    render() {
        const { message, visible } = this.state;

        return (
            <div
                ref={this.rootRef}
                className={classNames(
                    classes.root,
                    {
                        [classes.show]: visible,
                        [classes.hasAction]: message?.action
                    }
                )}
                aria-hidden={!this.state.visible}>
                <span>{message?.text}</span>

                {
                    message?.action &&
                    <button
                        className={classes.action}
                        onClick={message.action.handler}>
                        {message.action.text}
                    </button>
                }
            </div>
        );
    }
}

export default class SnackbarWrapper extends Component {

    static contextType = SnackbarContext;

    hideCompleteHandler = () => {
        this.context.hide();
    }

    render() {
        return (
            <Snackbar
                message={this.context.message}
                onHideComplete={this.hideCompleteHandler} />
        )
    }
}