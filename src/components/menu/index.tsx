import React, { useContext, useState, useCallback } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { noop } from '../../lib/utils';
import MenuContext, { MenuInfo, MenuClickEventHandler, MenuMode } from './MenuContext';
import SubMenu, { SubMenuProps } from './SubMenu';
import Item, { MenuItemProps } from './MenuItem';

export { default as SubMenu } from './SubMenu';
export { default as Item } from './MenuItem';

export interface MenuProps {
  mode?: MenuMode;
  defaultSelectedKey?: string;
  style?: React.CSSProperties;
  className?: string;
  onSelect?: MenuClickEventHandler;
  prefixCls?: string;
}

interface MenuType extends React.FC<MenuProps> {
  Item: typeof Item;
  SubMenu: typeof SubMenu;
}

const Menu: MenuType = props => {
  const {
    mode,
    defaultSelectedKey,
    prefixCls: customizePrefixCls,
    className,
    style,
    children,
    onSelect,
  } = props;
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey || '');
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('menu', customizePrefixCls);
  const classes = classNames(prefixCls, className, `${prefixCls}-${mode}`);

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
    return (
      <ul role="menu" className={classes} style={style}>
        {React.Children.map(children, child => {
          const childElement = child as React.FunctionComponentElement<MenuItemProps>;
          const { type, key } = childElement;
          const { displayName } = type;
          const strKey = key as string;

          if (displayName === '__KS_MenuItem__') {
            return React.cloneElement(childElement, {
              eventKey: strKey,
              rootPrefixCls: prefixCls,
            });
          }

          if (displayName === '__KS_SubMenu__') {
            const subChildElement = child as React.FunctionComponentElement<SubMenuProps>;
            return React.cloneElement(subChildElement, {
              eventKey: strKey,
              rootPrefixCls: prefixCls,
            });
          }

          throw Error("Menu's child can only be MenuItem or MenuItem");
        })}
      </ul>
    );
  };

  return (
    <MenuContext.Provider value={{ selectedKey, onSelect: handleClick, mode: mode as MenuMode }}>
      {renderChild()}
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
