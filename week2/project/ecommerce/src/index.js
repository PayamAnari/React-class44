import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

const root = document.getElementById('root');
const reactRoot = createRoot(root);
reactRoot.render(
  <Router>
    <App />
  </Router>,
);
