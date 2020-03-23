/* global setImmediate */

'use strict';

import * as EventEmitter from 'events';
import * as EventSourcePolyfill from 'eventsource';

declare global {
    interface Window {
        EventSource: typeof EventSourcePolyfill;
    }
}

if (!window.EventSource) {
    window.EventSource = EventSourcePolyfill;
}

const eventEmitter = new EventEmitter();
const eventSource = new EventSource('/api/block-stream');
eventSource.addEventListener('block-event', (event: any) => {
    setImmediate(() => {
        try {
            const blockData = JSON.parse(event.data);
            eventEmitter.emit('block-event', blockData);
        } catch (e) {
            console.log(e);
        }
    });
});

const addBlockUpdateListener = (f: VoidFunction) => {
    eventEmitter.on('block-event', f);
};

const removeBlockUpdateListener = (f: VoidFunction) => {
    eventEmitter.removeListener('block-event', f);
};

module.exports = {
    addBlockUpdateListener,
    removeBlockUpdateListener,
};
