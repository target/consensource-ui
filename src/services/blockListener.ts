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

let blockStream: EventSource | EventSourcePolyfill;

if (window.EventSource) {
  blockStream = new EventSource('/api/block-stream');
} else {
  blockStream = new EventSourcePolyfill('/api/block-stream');
}

export function onBlockEvent(event: any) {
  const blockData: Block = JSON.parse(event.data);
  eventEmitter.emit(BLOCK_EVENT, blockData);
}

export function addBlockUpdateListener(f: VoidFunction) {
  eventEmitter.on(BLOCK_EVENT, f);
}

export function removeBlockUpdateListener(f: VoidFunction) {
  eventEmitter.removeListener(BLOCK_EVENT, f);
}

blockStream.addEventListener(BLOCK_EVENT, onBlockEvent);
