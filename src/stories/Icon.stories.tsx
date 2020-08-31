import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Icon, IconProps, createFromIconfontCN } from '../components/icon';

type IconType = 'gerenzhongxin' | 'listgrid';

export default {
  title: '通用/Icon',
  component: Icon,
  argTypes: {
    icon: {
      description: '图标名称',
      control: 'text',
    },
  },
} as Meta;

const Template: Story<IconProps> = args => <Icon {...args} />;

export const Link = Template.bind({});
Link.args = {
  icon: 'link',
};

export const IconFont = () => {
  const IconFontComp = createFromIconfontCN<IconType>({
    scriptUrl: '//at.alicdn.com/t/font_1847800_xsxhtsd2ixr.js', // 在 iconfont.cn 上生成
  });

  return <IconFontComp type="gerenzhongxin" />;
};
