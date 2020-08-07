import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { noop } from '../../lib/utils';
import { MenuItemProps, MenuInfo, MenuClickEventHandler } from './MenuItem';

export { default as Item } from './MenuItem';

type MenuMode = 'horizontal' | 'vertical';

export interface MenuProps {
  mode?: MenuMode;
  defaultSelectedKey?: string;
  style?: React.CSSProperties;
  className?: string;
  onSelect?: MenuClickEventHandler;
  prefixCls?: string;
}

const Menu: React.FC<MenuProps> = props => {
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

  return (
    <ul role="menu" className={classes} style={style}>
      {React.Children.map(children, child => {
        const childElement = child as React.FunctionComponentElement<MenuItemProps>;
        const { type, key } = childElement;
        const { displayName } = type;
        const strKey = key as string;

        if (displayName === '__KS_MenuItem__') {
          return React.cloneElement(childElement, {
            isSelected: strKey === selectedKey,
            selectedKey: strKey,
            onClick: (info: MenuInfo) => {
              onSelect!(info);
              setSelectedKey(strKey);
            },
            rootPrefixCls: prefixCls,
          });
        }

        throw Error("Menu's child can only be MenuItem or SubMenu");
      })}
    </ul>
  );
};

Menu.defaultProps = {
  mode: 'horizontal',
  onSelect: noop,
};

export default Menu;
