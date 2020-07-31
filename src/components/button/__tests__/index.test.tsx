import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '..';

describe('Button', () => {
  it('renders correctly', () => {
    expect(<Button>Follow</Button>).toMatchSnapshot();
  });

  it('should add appropriate classes according to different props', () => {
    const prefixCls = 'ks-btn';
    const type = 'primary';
    const size = 'large';
    const customClass = 'custom-class';
    const wrapper = render(
      <Button danger type={type} size={size} className={customClass}>
        Button
      </Button>,
    );
    const element = wrapper.getByText('Button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(
      `${prefixCls} ${prefixCls}-danger ${prefixCls}-${type} ${prefixCls}-${size} ${customClass}`,
    );
  });

  it('should render as link when href is defined', () => {
    const wrapper = render(<Button href="https://kisstar.github.io/">Link</Button>);
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
  });

  it('should not clickable when button is disabled', () => {
    const handler = jest.fn();
    const wrapper = render(
      <Button onClick={handler} disabled>
        Button
      </Button>,
    );
    const element = wrapper.getByText('Button');
    expect(element).toBeInTheDocument();
    expect(element).toBeDisabled();
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(handler).not.toHaveBeenCalled();
  });

  it('should update and unmount without errors', () => {
    const wrapper = render(<Button>Button</Button>);
    expect(() => {
      wrapper.rerender(<Button>Button</Button>);
      wrapper.unmount();
    }).not.toThrow();
  });
});
