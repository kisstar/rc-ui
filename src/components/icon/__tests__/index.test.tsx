import React from 'react';
import { render } from '@testing-library/react';
import { Icon, IconProps, createFromIconfontCN } from '..';

describe('Icon', () => {
  it('should create SVG element.', () => {
    const props: IconProps = {
      icon: 'link',
      style: {
        fontSize: '3rem',
      },
      className: 'my-icon',
    };
    const icon = render(<Icon {...props} />);
    expect(icon).toMatchSnapshot();
  });
});

describe('Icon.createFromIconfontCN()', () => {
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1847800_xsxhtsd2ixr.js',
  });

  it('should support iconfont.cn', () => {
    const wrapper = render(
      <div className="icons-list">
        <IconFont type="gerenzhongxin" />
        <IconFont type="listgrid" />
      </div>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  const IconFont2 = createFromIconfontCN({
    scriptUrl: ['//at.alicdn.com/t/font_xxx.js', '//at.alicdn.com/t/font_1847800_xsxhtsd2ixr.js'],
  });

  it('should support ignore load error', () => {
    const wrapper = render(<IconFont2 type="gerenzhongxin" />);
    expect(wrapper).toMatchSnapshot();
  });
});
