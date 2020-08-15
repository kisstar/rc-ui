import React from 'react';
import { render } from '@testing-library/react';
import mountTest from '../../../tests/mountTest';
import { ConfigProvider } from '..';
import { Button } from '../../button';

const prefixCls = 'datura';

describe('ConfigProvider', () => {
  mountTest(() => (
    <ConfigProvider>
      <div />
    </ConfigProvider>
  ));

  it('should include the specified class prefix', () => {
    const wrapper = render(
      <ConfigProvider prefixCls={prefixCls}>
        <Button>Button</Button>
      </ConfigProvider>,
    );

    const element = wrapper.getByText('Button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(`${prefixCls}-btn`);
  });

  it('should support nest prefixCls', () => {
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
