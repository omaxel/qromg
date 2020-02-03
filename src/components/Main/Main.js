import React, { Component } from 'react';
import { registerPromise } from '../../serviceWorker';
import WorkerManager from '../../WorkerManager';
import InputBox from '../InputBox/InputBox';
import Output from '../Output/Output';
import Snackbar from '../Snackbar/Snackbar';
import SnackbarContext from '../Snackbar/snackbarContext';

export default class Main extends Component {

    showProgressBarTimeout = null;
    workerManager = null;

    static contextType = SnackbarContext;

    state = {
        generating: false,
        output: ''
    };

    componentDidMount() {
        this.workerManager = new WorkerManager();

        registerPromise
            .then(({ availableOffline, updateDownloaded, registration }) => {

                if (availableOffline) {
                    this.context.show({ text: 'Now available offline!' });
                } 
                
                // SW updated an waiting for activation
                else if (updateDownloaded) {
                    this.context.show({
                        text: 'An update is available',
                        action: {
                            text: 'Reload page',
                            handler: () => {

                                const waitingServiceWorker = registration.waiting;

                                if (waitingServiceWorker) {
                                    waitingServiceWorker.addEventListener('statechange', event => {
                                        if (event.target.state === 'activated') {
                                            window.location.reload();
                                        }
                                    });
                                    waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
                                }
                            }
                        }
                    });
                }
            })
            .catch(error => {
                console.log('Error during service worker registration:', error);
            });
    }

    generate = content => {

        // If the code generation requires more than 100ms, show the progress bar
        this.showProgressBarTimeout = setTimeout(() => {
            this.setState({ generating: true, output: '' });
        }, 100);

        this.workerManager.generateQrCode(content)
            .then(data => {
                this.setState({ output: data });
            })
            .catch(error => {
                // TODO: handle error
                console.log('[Main] Error while generating QR Code');
            })
            .then(() => {
                clearTimeout(this.showProgressBarTimeout);
                this.setState({ generating: false });
            })
    }

    render() {
        return (
            <main>
                <InputBox
                    generateHandler={this.generate}
                    generating={this.state.generating} />
                <Output imgSrc={this.state.output} />
                <Snackbar />
            </main>
        );
    }
}