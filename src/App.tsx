import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <div className="app">Hello world!</div>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
