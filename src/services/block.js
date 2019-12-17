/* global setImmediate */

'use strict'

const EventEmitter = require('events')
const EventSourcePolyfill = require('eventsource')

if (!window.EventSource) {
  window.EventSource = EventSourcePolyfill
}

const eventEmitter = new EventEmitter()
const eventSource = new EventSource('/api/block-stream')
eventSource.addEventListener('block-event', (event) => {
  setImmediate(() => {
    try {
      let blockData = JSON.parse(event.data)
      eventEmitter.emit('block-event', blockData)
    } catch (e) {
      console.log(e)
    }
  })
})

const addBlockUpdateListener = (f) => {
  eventEmitter.on('block-event', f)
}

const removeBlockUpdateListener = (f) => {
  eventEmitter.removeListener('block-event', f)
}

module.exports = {
  addBlockUpdateListener,
  removeBlockUpdateListener
}
