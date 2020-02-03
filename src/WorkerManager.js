// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./Worker';

export default class WorkerManager {

    constructor() {
        this._worker = new Worker();
        this._worker.addEventListener('message', this._onMessageReceived);

        this._promises = {};
    }

    _onMessageReceived = ({ data }) => {
        if (data.action === 'create') {
            const promise = this._promises[data.id];

            if (data.success) {
                promise.resolve(data.result);
            } else {
                promise.reject();
            }

            delete this._promises[data.id];
        }
    }

    generateQrCode(content) {
        const requestId = this._generateId();

        const promise = new Promise((resolve, reject) => {
            this._promises[requestId] = { resolve, reject };
        });

        this._worker.postMessage({
            id: requestId,
            action: 'create',
            content
        });

        return promise;
    }

    _generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}