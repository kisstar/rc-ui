import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getStyleStr, mountTest, expectToThrow } from '../../../tests';
import { Menu, MenuProps } from '..';
import { SubMenu } from '../SubMenu';
import { MenuItem } from '../MenuItem';
import { Icon } from '../../icon';

const genMenu = (props?: MenuProps) => {
  return (
    <Menu data-testid="menu" defaultSelectedKey="1" {...props}>
      <MenuItem key="1">Active</MenuItem>
      <MenuItem key="2">Normal</MenuItem>
      <MenuItem key="3" disabled>
        Disabled
      </MenuItem>
      <SubMenu data-testid="submenu" title="SubItems">
        <MenuItem key="4">First SubItem</MenuItem>
        <MenuItem key="5">Second SubItem</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const prefixCls = 'ks-menu';
const openClass = `${prefixCls}-submenu-open`;
const itemActiveClass = `${prefixCls}-item-selected`;
const subMenuActiveClass = `${prefixCls}-submenu-selected`;

describe('Menu', () => {
  it('renders correctly', () => {
    expect(genMenu()).toMatchSnapshot();
  });

  mountTest(() => genMenu());

  it('should render correct Menu and MenuItem based on the specified props', () => {
    const wrapper = render(genMenu());
    const menuElement = wrapper.getByTestId('menu');
    const activeElement = wrapper.getByText('Active');
    const disabledElement = wrapper.getByText('Disabled');

    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass(`${prefixCls} ${prefixCls}-horizontal`);
    expect(activeElement).toHaveClass(itemActiveClass);
    expect(disabledElement).toHaveClass(`${prefixCls}-item-disabled`);
    expect(menuElement.getElementsByTagName('li').length).toEqual(6); // two items in the drop-down menu are hidden
    expect(menuElement.getElementsByTagName('li')[0]).toHaveClass(`${prefixCls}-item`);
  });

  it("Menu's child should only be SubMenu or MenuItem", () => {
    expectToThrow(() => {
      render(
        <Menu data-testid="menu">
          <li>Menu Item</li>
        </Menu>,
      );
    });
  });

  it("SubMenu's child should only be MenuItem", () => {
    expectToThrow(() => {
      render(
        <Menu data-testid="menu">
          <SubMenu title="SubItems">
            <li>Menu Item</li>
          </SubMenu>
        </Menu>,
      );
    });
  });

  it('should render vertical mode when mode is set to vertical', () => {
    const wrapper = render(genMenu({ mode: 'vertical' }));
    const menuElement = wrapper.getByTestId('menu');

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
    expect(normalItem).toHaveClass(itemActiveClass);
    expect(activeElement).not.toHaveClass(itemActiveClass);
    expect(testProps.onSelect).toHaveBeenCalledWith(args);
    testProps.onSelect.mockRestore();
    fireEvent.click(disabledElement);
    expect(normalItem).toHaveClass(itemActiveClass);
    expect(disabledElement).not.toHaveClass(itemActiveClass);
    expect(testProps.onSelect).not.toHaveBeenCalledWith(expect.any(Object));
  });

  it('should trigger mouse click when enter key down', () => {
    const testProps = { onSelect: jest.fn() };
    const wrapper = render(genMenu(testProps));
    const normalItem = wrapper.getByText('Normal');
    const disabledElement = wrapper.getByText('Disabled');
    const args = expect.objectContaining({
      key: '2',
      domEvent: expect.any(Object),
    });

    fireEvent.keyDown(normalItem, { key: 'Enter', keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith(args);
    testProps.onSelect.mockRestore();
    fireEvent.keyDown(disabledElement, { key: 'Enter', keyCode: 13 });
    expect(testProps.onSelect).not.toHaveBeenCalledWith(args);
  });

  it('should show dropdown items when hover on subMenu', async () => {
    const testProps = { onSelect: jest.fn() };
    const wrapper = render(genMenu(testProps));
    const dropBtn = wrapper.getByRole('button');
    const dropMenu = wrapper.getByTestId('submenu');

    expect(dropMenu).not.toHaveClass(openClass);
    fireEvent.mouseEnter(dropBtn);
    await wait(() => {
      // notice that setTimeout was used in the component before
      expect(dropMenu).toHaveClass(openClass);
    });
    fireEvent.click(wrapper.getByText('First SubItem'));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      key: '4',
      domEvent: expect.any(Object),
    });
    fireEvent.mouseLeave(dropBtn);
    await wait(() => {
      expect(dropMenu).toHaveClass(subMenuActiveClass);
      expect(dropMenu).not.toHaveClass(openClass);
    });
  });

  it('should show dropdown items when click on subMenu with mode vertical', async () => {
    const testProps: MenuProps = {
      mode: 'vertical',
      onSelect: jest.fn(),
    };
    const wrapper = render(genMenu(testProps));
    const dropBtn = wrapper.getByRole('button');
    const dropMenu = wrapper.getByTestId('submenu');

    expect(dropMenu).not.toHaveClass(openClass);
    fireEvent.mouseEnter(dropBtn);
    expect(dropMenu).not.toHaveClass(openClass);

    fireEvent.click(dropBtn);
    expect(dropMenu).toHaveClass(openClass);

    fireEvent.click(wrapper.getByText('Second SubItem'));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      key: '5',
      domEvent: expect.any(Object),
    });

    fireEvent.click(dropBtn);
    expect(dropMenu).toHaveClass(subMenuActiveClass);
    expect(dropMenu).not.toHaveClass(openClass);
  });

  it('should show dropdown items when enter key down with mode vertical', async () => {
    const testProps: MenuProps = {
      mode: 'vertical',
      onSelect: jest.fn(),
    };
    const wrapper = render(genMenu(testProps));
    const dropBtn = wrapper.getByRole('button');
    const dropMenu = wrapper.getByTestId('submenu');

    // it is not displayed by default
    expect(dropMenu).not.toHaveClass(openClass);

    fireEvent.keyDown(dropBtn, { key: 'Enter', keyCode: 13 });
    expect(dropMenu).toHaveClass(openClass);

    fireEvent.keyDown(dropBtn, { key: 'Enter', keyCode: 13 });
    expect(dropMenu).not.toHaveClass(openClass);
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

  it('should add cross styles to the correct dom', () => {
    const testClassName = 'test';
    const testStyle = { backgroundColor: '#f8f9fa' };
    const wrapper = render(
      genMenu({
        mode: 'responsive',
        className: testClassName,
        style: testStyle,
      }),
    );
    const navEle = wrapper.getByTestId('menu');
    const ele = wrapper.getAllByRole('menu')[0];

    expect(navEle).toBeInTheDocument();
    expect(navEle).toHaveClass(testClassName);
    expect(navEle).toHaveStyle(getStyleStr(testStyle));
    expect(ele).toBeInTheDocument();
    expect(ele).not.toHaveClass(testClassName);
    expect(ele).not.toHaveStyle(getStyleStr(testStyle));
  });

  it('should display the DOM correctly in responsive mode', () => {
    const wrapper = render(genMenu({ mode: 'responsive' }));
    const navEle = wrapper.getByTestId('menu');

    // it is vulnerable to rely heavily on the current DOM structure
    const ele = wrapper.getAllByRole('menu')[0];
    const buttonEle = navEle.firstElementChild as Element;

    expect(buttonEle).toBeInTheDocument();
    expect(buttonEle.tagName).toEqual('BUTTON');
    // the value of display depends on the size of the test window
    // expect(getComputedStyle(buttonEle).display).toEqual('none');

    fireEvent.click(buttonEle);
    expect(ele).toHaveClass(`${prefixCls}-show`);
  });
});
