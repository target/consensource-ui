import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'view/App';
import 'mobx-react-lite/batchingForReactDom';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
