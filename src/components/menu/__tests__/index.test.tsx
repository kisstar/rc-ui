import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import mountTest from '../../../tests/mountTest';
import { Menu, MenuProps } from '..';
import { SubMenu } from '../SubMenu';
import { MenuItem } from '../MenuItem';
import { Icon } from '../../icon';

const genMenu = (props?: MenuProps) => {
  return (
    <Menu defaultSelectedKey="1" {...props}>
      <MenuItem key="1">Active</MenuItem>
      <MenuItem key="2">Normal</MenuItem>
      <MenuItem key="3" disabled>
        Disabled
      </MenuItem>
      <SubMenu title="SubItems">
        <MenuItem key="4">First SubItem</MenuItem>
        <MenuItem key="5">Second SubItem</MenuItem>
      </SubMenu>
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
    expect(menuElement.getElementsByTagName('li').length).toEqual(4);
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
    const args = expect.objectContaining({
      key: '2',
      domEvent: expect.any(Object),
    });

    fireEvent.click(normalItem);
    expect(normalItem).toHaveClass(activeClass);
    expect(activeElement).not.toHaveClass(activeClass);
    expect(testProps.onSelect).toHaveBeenCalledWith(args);
    testProps.onSelect.mockRestore();
    fireEvent.click(disabledElement);
    expect(normalItem).toHaveClass(activeClass);
    expect(disabledElement).not.toHaveClass(activeClass);
    expect(testProps.onSelect).not.toHaveBeenCalledWith(expect.any(Object));
  });

  it('should show dropdown items when hover on subMenu', async () => {
    const testProps = { onSelect: jest.fn() };
    const wrapper = render(genMenu(testProps));
    const subElement = wrapper.getByText('SubItems');

    expect(wrapper.queryByText('First SubItem')).not.toBeInTheDocument();
    fireEvent.mouseEnter(subElement);
    await wait(() => {
      // notice that setTimeout was used in the component before
      expect(wrapper.queryByText('First SubItem')).toBeInTheDocument();
    });
    fireEvent.click(wrapper.getByText('First SubItem'));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      key: '4',
      domEvent: expect.any(Object),
    });
    fireEvent.mouseLeave(subElement);
    await wait(() => {
      expect(wrapper.queryByText('First SubItem')).not.toBeInTheDocument();
    });
  });

  it('should show dropdown items when click on subMenu with mode vertical', async () => {
    const testProps: MenuProps = {
      mode: 'vertical',
      onSelect: jest.fn(),
    };
    const wrapper = render(genMenu(testProps));
    const subElement = wrapper.getByText('SubItems');

    expect(wrapper.queryByText('Second SubItem')).not.toBeInTheDocument();
    fireEvent.mouseEnter(subElement);
    await wait(() => {
      expect(wrapper.queryByText('Second SubItem')).not.toBeInTheDocument();
    });

    fireEvent.click(subElement);
    await wait(() => {
      expect(wrapper.queryByText('Second SubItem')).toBeInTheDocument();
    });

    fireEvent.click(wrapper.getByText('Second SubItem'));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      key: '5',
      domEvent: expect.any(Object),
    });

    fireEvent.click(subElement);
    await wait(() => {
      expect(wrapper.queryByText('Second SubItem')).not.toBeInTheDocument();
    });
  });

  it('MenuItem should render icon and icon should be the first child when icon exists', () => {
    const wrapper = render(
      <Menu>
        <Menu.Item key="link" icon={<Icon data-testid="link" icon="link" />}>
          Navigation One
        </Menu.Item>
      </Menu>,
    );
    expect(expect(wrapper.getByTestId('link')).toBeInTheDocument());
  });
});
