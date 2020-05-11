import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.css';
import App from 'components/App';
import 'mobx-react-lite/batchingForReactDom';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);
