import React, { Component } from 'react';
import classes from './App.module.scss';
import Header from './Header/Header';
import Main from './Main/Main';
import ToastContext from './Snackbar/snackbarContext';


export default class App extends Component {
  state = {
    snackBarMessage: null
  }

  snackBarQueue = []

  showSnackbar = message => {
    if (this.state.snackBarMessage === null) {
      this.setState({ snackBarMessage: message });
    }
    else {
      this.snackBarQueue.push(message);
    }
  }

  hideSnackbar = () => {
    if (this.snackBarQueue.length === 0) {
      this.setState({ snackBarMessage: null });
    } else {
      const nextElement = this.snackBarQueue.shift();
      this.setState({ snackBarMessage: nextElement });
    }
  }

  render() {
    return (
      <ToastContext.Provider
        value={{
          message: this.state.snackBarMessage,
          show: this.showSnackbar,
          hide: this.hideSnackbar
        }}>
        <div className={classes.app}>
          <Header />
          <Main />
        </div>
      </ToastContext.Provider>
    )
  }
}