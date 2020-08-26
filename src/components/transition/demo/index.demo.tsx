import React, { useState } from 'react';
import { CSSTransition } from '..';
import { Button } from '../../button';
import './index.demo.scss';

function App() {
  const [inProp, setInProp] = useState(false);
  const [showBox, setShowBox] = useState(false);

  return (
    <>
      <Button onClick={() => setInProp(!inProp)}>Toggle text</Button>{' '}
      <Button onClick={() => setShowBox(!showBox)}>Toggle box</Button>
      <CSSTransition in={inProp} timeout={1000} classNames="fade">
        <div>I will receive fade-* classes</div>
      </CSSTransition>
      <CSSTransition in={showBox} timeout={1000} animation={['fadeIn', 'fadeOut']}>
        <div className="box" />
      </CSSTransition>
    </>
  );
}

export default App;
