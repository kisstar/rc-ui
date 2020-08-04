import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import MenuContext from './MenuContext';

export interface MenuInfo {
  key: string;
  domEvent: React.MouseEvent<HTMLElement>;
}

export type MenuClickEventHandler = (info: MenuInfo) => void;

export interface MenuItemProps {
  key: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick?: MenuClickEventHandler;
  rootPrefixCls: string;
  isSelected?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { rootPrefixCls, className, style, disabled, children, isSelected, onClick } = props;
  const { key } = useContext(MenuContext);
  const classes = classNames(`${rootPrefixCls}-item`, className, {
    [`${rootPrefixCls}-item-disabled`]: disabled,
    [`${rootPrefixCls}-item-selected`]: isSelected,
  });
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const info = {
        key,
        domEvent: e,
      };
      if (!disabled) {
        onClick!(info);
      }
    },
    [key, disabled, onClick],
  );
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>): boolean | undefined => {
      const { keyCode } = e;
      if (keyCode === 13 && !disabled) {
        onClick!({ key, domEvent: e as any });
        return true;
      }
      return undefined;
    },
    [key, disabled, onClick],
  );

  return (
    <li
      role="menuitem"
      className={classes}
      style={style}
      onClick={handleClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </li>
  );
};

MenuItem.displayName = '__KS_MenuItem__';

export default MenuItem;
