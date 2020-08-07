import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import mountTest from '../../../tests/mountTest';
import Menu, { MenuProps } from '..';
import MenuItem from '../MenuItem';

const genMenu = (props?: MenuProps) => {
  return (
    <Menu defaultSelectedKey="1" {...props}>
      <MenuItem key="1">Active</MenuItem>
      <MenuItem key="2">Normal</MenuItem>
      <MenuItem key="3" disabled>
        Disabled
      </MenuItem>
    </Menu>
  );
};
const prefixCls = 'ks-menu';
const activeClass = `${prefixCls}-item-selected`;

describe('Menu', () => {
  it('renders correctly', () => {
    expect(genMenu()).toMatchSnapshot();
  });

  mountTest(() => genMenu());

  it('should render correct Menu and MenuItem based on the specified props', () => {
    const wrapper = render(genMenu());
    const menuElement = wrapper.getByRole('menu');
    const activeElement = wrapper.getByText('Active');
    const disabledElement = wrapper.getByText('Disabled');

    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass(`${prefixCls} ${prefixCls}-horizontal`);
    expect(activeElement).toHaveClass(activeClass);
    expect(disabledElement).toHaveClass(`${prefixCls}-item-disabled`);
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(menuElement.getElementsByTagName('li')[0]).toHaveClass(`${prefixCls}-item`);
  });

  it('should render vertical mode when mode is set to vertical', () => {
    const wrapper = render(genMenu({ mode: 'vertical' }));
    const menuElement = wrapper.getByRole('menu');

    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass(`${prefixCls} ${prefixCls}-vertical`);
  });

  it('click items should change active and call the right callback', () => {
    const testProps = { onSelect: jest.fn() };
    const wrapper = render(genMenu(testProps));
    const activeElement = wrapper.getByText('Active');
    const disabledElement = wrapper.getByText('Disabled');
    const normalItem = wrapper.getByText('Normal');

    fireEvent.click(normalItem);
    expect(normalItem).toHaveClass(activeClass);
    expect(activeElement).not.toHaveClass(activeClass);
    expect(testProps.onSelect).toHaveBeenCalledWith(expect.any(Object));
    fireEvent.click(disabledElement);
    expect(normalItem).toHaveClass(activeClass);
    expect(disabledElement).not.toHaveClass(activeClass);
  });
});
