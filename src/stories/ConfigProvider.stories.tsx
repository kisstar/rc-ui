import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { ConfigProvider } from '../components/config-provider';
import { Button } from '../components/button';

export default {
  title: '其它/ConfigProvider',
  component: ConfigProvider,
} as Meta;

export const PrefixCls = () => (
  <ConfigProvider prefixCls="ks">
    <Button>Button</Button>
  </ConfigProvider>
);
