import React from 'react';
import Button from './components/button';
import './app.scss';

function App() {
  return (
    <div className="app">
      <div className="button-container">
        <Button>Default</Button>
        <Button size="large">Large</Button>
        <Button size="sm">Sm</Button>
        <Button type="primary">Primary</Button>
        <Button type="link">Link</Button>
        <Button danger>Danger</Button>
        <Button disabled>Disabled</Button>
        <Button type="link" disabled>
          Link Disabled
        </Button>
        <Button href="http://www.baidu.com/">Href</Button>
        <Button type="link" disabled href="http://www.baidu.com/">
          Link Href Disabled
        </Button>
      </div>
    </div>
  );
}

export default App;
