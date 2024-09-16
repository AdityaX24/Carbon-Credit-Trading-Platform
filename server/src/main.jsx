import App from './App.jsx';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { TransactionProvider } from './context/Master_TransactionContext';

ReactDOM.render(
  <TransactionProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </TransactionProvider>,
  document.getElementById('root')
)