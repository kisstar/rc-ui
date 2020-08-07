import React from 'react';
import ConfigProvider from './components/config-provider';
import Button from './components/button';
import Menu, { Item } from './components/menu';
import './app.scss';

function App() {
  return (
    <div className="app">
      <ConfigProvider prefixCls="ks">
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
        <div className="menu-container">
          <Menu mode="vertical">
            <Item disabled key="1">
              首页
            </Item>
            <Item key="2">GitHub</Item>
            <Item key="3">博客</Item>
            <Item key="4">笔记</Item>
          </Menu>
        </div>
      </ConfigProvider>
    </div>
  );
}

export default App;
