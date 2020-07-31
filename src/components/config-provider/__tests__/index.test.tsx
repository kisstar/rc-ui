import React from 'react';
import { render } from '@testing-library/react';
import ConfigProvider from '..';
import Button from '../../button';

describe('ConfigProvider', () => {
  it('should include the specified class prefix', () => {
    const prefixCls = 'boom';
    const wrapper = render(
      <ConfigProvider prefixCls={prefixCls}>
        <ConfigProvider>
          <Button>Button</Button>
        </ConfigProvider>
      </ConfigProvider>,
    );

    const element = wrapper.getByText('Button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(`${prefixCls}-btn`);
  });
});
