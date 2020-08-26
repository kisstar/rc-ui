import React from 'react';
import MenuDemo from '../components/menu/demo/index.demo';
import TransitionDemo from '../components/transition/demo/index.demo';
import '../styles/index.scss';
import './home.scss';

function Home() {
  return (
    <div className="demo-container">
      <MenuDemo />
      <div className="transition-demo-cotainer">
        <TransitionDemo />
      </div>
    </div>
  );
}

export default Home;
