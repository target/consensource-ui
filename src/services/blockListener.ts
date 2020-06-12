import { EventEmitter } from 'events';
import EventSourcePolyfill from 'eventsource';

declare global {
  interface Window {
    EventSource: typeof EventSource;
  }
}

export interface Block {
  block_id: string;
  block_num: number;
}

const eventEmitter = new EventEmitter();

const BLOCK_EVENT = 'block-event';

// TODO: Convert this into a store so that we can perform
// automatic DOM updates on block events
let blockStream: EventSource | EventSourcePolyfill;

if (window.EventSource) {
  blockStream = new EventSource('/api/block-stream');
} else {
  blockStream = new EventSourcePolyfill('/api/block-stream');
}

export function onBlockEvent(event: any) {
  try {
    const blockData: Block = JSON.parse(event.data);
    eventEmitter.emit(BLOCK_EVENT, blockData);
  } catch ({ message }) {
    console.error(message);
  }
}

export function addBlockUpdateListener(f: VoidFunction) {
  eventEmitter.on(BLOCK_EVENT, f);
}

export function removeBlockUpdateListener(f: VoidFunction) {
  eventEmitter.removeListener(BLOCK_EVENT, f);
}

blockStream.addEventListener(BLOCK_EVENT, onBlockEvent.bind(this));
