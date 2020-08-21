import React, { useContext, useState, useCallback } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { noop } from '../../lib/utils';
import MenuContext, { MenuInfo, MenuClickEventHandler, MenuMode } from './MenuContext';
import { SubMenu, SubMenuProps } from './SubMenu';
import { MenuItem as Item, MenuItemProps } from './MenuItem';

export { default as SubMenu } from './SubMenu';
export { default as Item } from './MenuItem';

export interface MenuProps {
  /** 菜单类型，现在支持垂直、水平两种 */
  mode?: MenuMode;
  /** 初始选中的菜单项 key 值 */
  defaultSelectedKey?: string;
  /** 根节点样式 */
  style?: React.CSSProperties;
  className?: string;
  /** 被选中时调用 */
  onSelect?: MenuClickEventHandler;
  prefixCls?: string;
}

interface MenuType extends React.FC<MenuProps> {
  Item: typeof Item;
  SubMenu: typeof SubMenu;
}

/**
 * 为页面和功能提供导航的菜单列表。
 *
 * 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。
 *
 * 通常，导航分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
 */
export const Menu: MenuType = props => {
  const {
    mode,
    defaultSelectedKey,
    prefixCls: customizePrefixCls,
    className = '',
    style,
    children,
    onSelect,
  } = props;
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey || '');
  const [shouldShow, setShouldShow] = useState(false);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('menu', customizePrefixCls);
  const needResponsive = mode === 'responsive';
  const navClasses = classNames(`${prefixCls}-navbar`, className);
  const classes = classNames(prefixCls, `${prefixCls}-${mode}`, {
    [className]: !needResponsive,
    [`${prefixCls}-show`]: shouldShow,
  });

  const handleClick = useCallback(
    (info: MenuInfo) => {
      setSelectedKey(info.key);
      if (onSelect) {
        onSelect(info);
      }
    },
    [onSelect],
  );

  const renderChild = () => {
    return React.Children.map(children, child => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { type, key } = childElement;
      const { displayName } = type;
      const strKey = key as string;

      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          eventKey: strKey,
          rootPrefixCls: prefixCls,
        });
      }

      if (displayName === 'SubMenu') {
        const subChildElement = child as React.FunctionComponentElement<SubMenuProps>;
        return React.cloneElement(subChildElement, {
          eventKey: strKey,
          rootPrefixCls: prefixCls,
        });
      }

      throw Error("Menu's child can only be SubMenu or MenuItem");
    });
  };

  return (
    <MenuContext.Provider value={{ selectedKey, onSelect: handleClick, mode: mode as MenuMode }}>
      {needResponsive ? (
        <nav className={navClasses} style={style}>
          <button
            className={`${prefixCls}-toggler`}
            type="button"
            onClick={() => setShouldShow(!shouldShow)}
          >
            <span className={`${prefixCls}-icon`} />
          </button>
          <ul role="menu" className={classes}>
            {renderChild()}
          </ul>
        </nav>
      ) : (
        <ul role="menu" className={classes} style={style}>
          {renderChild()}
        </ul>
      )}
    </MenuContext.Provider>
  );
};

Menu.Item = Item;
Menu.SubMenu = SubMenu;

Menu.defaultProps = {
  mode: 'horizontal',
  onSelect: noop,
};

export default Menu;
