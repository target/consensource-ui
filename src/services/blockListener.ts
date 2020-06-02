/* global setImmediate */
import { EventEmitter } from 'events';
import EventSourcePolyfill from 'eventsource';

declare global {
  interface Window {
    EventSource: typeof EventSourcePolyfill | typeof EventSource;
  }
}

window.EventSource = window.EventSource || EventSourcePolyfill;

const eventEmitter = new EventEmitter();
const blockStream = new EventSource('/api/block-stream');

blockStream.addEventListener('block-event', (event: any) => {
  setImmediate(() => {
    try {
      const blockData = JSON.parse(event.data);
      console.log(blockData);
      eventEmitter.emit('block-event', blockData);
    } catch (e) {
      console.error(e);
    }
  });
});

export const addBlockUpdateListener = (f: VoidFunction): void => {
  eventEmitter.on('block-event', f);
};

export const removeBlockUpdateListener = (f: VoidFunction): void => {
  eventEmitter.removeListener('block-event', f);
};
