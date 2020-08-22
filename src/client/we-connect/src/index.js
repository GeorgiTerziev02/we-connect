import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navigation from './navigation';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App>
        <Navigation />
      </App>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);