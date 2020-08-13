import React from 'react';
import ConfigProvider from './components/config-provider';
import Button from './components/button';
import Menu, { SubMenu, Item } from './components/menu';
import Icon, { createFromIconfontCN } from './components/icon';
import './app.scss';

type IconType = 'gerenzhongxin' | 'listgrid';

const IconFont = createFromIconfontCN<IconType>({
  scriptUrl: '//at.alicdn.com/t/font_1847800_xsxhtsd2ixr.js',
});

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
          <Menu>
            <Item disabled key="1">
              首页
            </Item>
            <Item key="2">GitHub</Item>
            <SubMenu title="文章">
              <Item key="3">文章1</Item>
              <Item key="4">文章2</Item>
              <Item key="5">文章3</Item>
            </SubMenu>
            <Item key="6">博客</Item>
            <Item key="7">笔记</Item>
            <SubMenu title="其它">
              <Item key="8">a</Item>
              <Item key="9">b</Item>
              <Item key="10">c</Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="icon-container">
          <Icon icon="link" />
          <IconFont type="gerenzhongxin" />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default App;
