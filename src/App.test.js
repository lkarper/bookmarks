import React from 'react';
import ReactDOM from 'react-dom';
import { BrowswerRouter } from 'react-router-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowswerRouter>
      <App />
    </BrowswerRouter>, 
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
