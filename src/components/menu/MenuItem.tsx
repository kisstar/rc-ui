import React, { useCallback } from 'react';
import classNames from 'classnames';

export interface MenuInfo {
  selectedKey: string;
  domEvent: React.MouseEvent<HTMLElement>;
}

export type MenuClickEventHandler = (info: MenuInfo) => void;

export interface MenuItemProps {
  key: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick?: MenuClickEventHandler;
  rootPrefixCls?: string;
  isSelected?: boolean;
  selectedKey?: string;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const {
    rootPrefixCls,
    className,
    style,
    disabled,
    children,
    isSelected,
    selectedKey,
    onClick,
  } = props;
  const classes = classNames(`${rootPrefixCls}-item`, className, {
    [`${rootPrefixCls}-item-disabled`]: disabled,
    [`${rootPrefixCls}-item-selected`]: isSelected,
  });
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const info = {
        selectedKey: selectedKey as string,
        domEvent: e,
      };
      if (!disabled) {
        onClick!(info);
      }
    },
    [selectedKey, disabled, onClick],
  );
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>): boolean | undefined => {
      const { keyCode } = e;
      if (keyCode === 13 && !disabled) {
        onClick!({ selectedKey: selectedKey as string, domEvent: e as any });
        return true;
      }
      return undefined;
    },
    [selectedKey, disabled, onClick],
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
