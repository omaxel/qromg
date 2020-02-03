/* eslint no-restricted-globals:0 */
import * as qrcode from 'qrcode-generator';

self.addEventListener('message', event => {
    const { action, id, content } = event.data;

    if (action === 'create') {
        const generator = qrcode(0, 'M');

        generator.addData(content);

        generator.make();

        self.postMessage({
            id,
            action: 'create',
            success: true,
            result: generator.createDataURL(5)
        });
    }
});