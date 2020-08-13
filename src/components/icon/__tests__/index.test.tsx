import React from 'react';
import { render } from '@testing-library/react';
import Icon, { IconProps, createFromIconfontCN } from '..';

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
});
