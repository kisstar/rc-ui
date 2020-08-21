import React from 'react';
import { Menu } from '..';

const { Item, SubMenu } = Menu;

function NavBar() {
  return (
    <div className="menu-demo">
      <Menu>
        <Item key="1">菜单1</Item>
        <SubMenu title="菜单组1">
          <Item key="2">菜单2，我是一条很长的文本</Item>
          <Item key="3">菜单3</Item>
          <Item disabled key="4">
            菜单4
          </Item>
          <Item key="5">菜单5</Item>
        </SubMenu>
        <SubMenu disabled title="菜单组2">
          <Item key="6">菜单6</Item>
          <Item disabled key="7">
            菜单7
          </Item>
        </SubMenu>
        <Item key="8">菜单8</Item>
        <Item disabled key="9">
          菜单9
        </Item>
        <Item key="0">菜单0</Item>
      </Menu>
      <Menu mode="vertical" style={{ width: 240 }}>
        <Item key="1">菜单1</Item>
        <SubMenu title="菜单组1">
          <Item key="2">菜单2，我是一条很长的文本</Item>
          <Item key="3">菜单3</Item>
          <Item disabled key="4">
            菜单4
          </Item>
          <Item key="5">菜单5</Item>
        </SubMenu>
        <SubMenu disabled title="菜单组2">
          <Item key="6">菜单6</Item>
          <Item disabled key="7">
            菜单7
          </Item>
        </SubMenu>
        <Item key="8">菜单8</Item>
        <Item disabled key="9">
          菜单9
        </Item>
        <Item key="0">菜单0</Item>
      </Menu>
      <Menu mode="responsive">
        <Item key="1">菜单1</Item>
        <SubMenu title="菜单组1">
          <Item key="2">菜单2，我是一条很长的文本</Item>
          <Item key="3">菜单3</Item>
          <Item disabled key="4">
            菜单4
          </Item>
          <Item key="5">菜单5</Item>
        </SubMenu>
        <SubMenu disabled title="菜单组2">
          <Item key="6">菜单6</Item>
          <Item disabled key="7">
            菜单7
          </Item>
        </SubMenu>
        <Item key="8">菜单8</Item>
        <Item disabled key="9">
          菜单9
        </Item>
        <Item key="0">菜单0</Item>
      </Menu>
    </div>
  );
}

export default NavBar;
