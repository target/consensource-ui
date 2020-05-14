import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.css';
import App from 'view/App';
import 'mobx-react-lite/batchingForReactDom';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
