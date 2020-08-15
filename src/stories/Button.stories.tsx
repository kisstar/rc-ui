import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from '../components/button';

export default {
  title: '通用/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args}>Button</Button>;

export const Defautlt = Template.bind({});
Defautlt.args = {};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};

export const Danger = Template.bind({});
Danger.args = {
  danger: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
