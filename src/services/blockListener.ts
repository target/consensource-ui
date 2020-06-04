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

// TODO: Convert this into a store so that we can perform
// automatic DOM updates on block events
export default class BlockListener {
  blockStream: EventSource | EventSourcePolyfill;

  eventEmitter: EventEmitter;

  BLOCK_EVENT = 'block-event';

  constructor() {
    this.eventEmitter = new EventEmitter();

    if (window.EventSource) {
      this.blockStream = new EventSource('/api/block-stream');
    } else {
      this.blockStream = new EventSourcePolyfill('/api/block-stream');
    }

    this.blockStream.addEventListener(
      this.BLOCK_EVENT,
      this.onBlockEvent.bind(this),
    );
  }

  onBlockEvent(event: any) {
    try {
      const blockData: Block = JSON.parse(event.data);
      this.eventEmitter.emit(this.BLOCK_EVENT, blockData);
    } catch (e) {
      console.error(e);
    }
  }

  addBlockUpdateListener(f: VoidFunction) {
    this.eventEmitter.on(this.BLOCK_EVENT, f);
  }

  removeBlockUpdateListener(f: VoidFunction) {
    this.eventEmitter.removeListener(this.BLOCK_EVENT, f);
  }
}
