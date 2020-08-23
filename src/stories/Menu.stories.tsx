import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Menu, MenuProps } from '../components/menu';
import { SubMenu } from '../components/menu/SubMenu';
import { MenuItem } from '../components/menu/MenuItem';
import { Icon } from '../components/icon';

export default {
  title: '导航/Menu',
  component: Menu,
  subcomponents: { SubMenu, MenuItem },
} as Meta;

const MenuTemplate: Story<MenuProps> = args => (
  <Menu {...args}>
    <MenuItem disabled key="1" icon={<Icon icon="link" />}>
      首页
    </MenuItem>
    <MenuItem key="2">GitHub</MenuItem>
    <SubMenu icon={<Icon icon="arrow-down" />} title="文章">
      <MenuItem key="3">文章1</MenuItem>
      <MenuItem key="4">文章2</MenuItem>
      <MenuItem key="5">文章3</MenuItem>
    </SubMenu>
    <MenuItem icon={<Icon icon="link" />} key="6">
      博客
    </MenuItem>
    <MenuItem key="7">笔记</MenuItem>
    <SubMenu title="其它">
      <MenuItem key="8">其它a</MenuItem>
      <MenuItem key="9">其它b</MenuItem>
      <MenuItem key="10">其它c</MenuItem>
    </SubMenu>
  </Menu>
);

export const HorizontalMenu = MenuTemplate.bind({});
HorizontalMenu.args = {};

export const VerticalMenu = MenuTemplate.bind({});
VerticalMenu.args = {
  mode: 'vertical',
};

export const ResponsiveMenu = MenuTemplate.bind({});
ResponsiveMenu.args = {
  mode: 'responsive',
};
