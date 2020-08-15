import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import MenuContext from './MenuContext';

export interface MenuItemProps {
  /** 唯一标志 */
  key: string;
  /** 是否禁用 */
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  /** 菜单图标 */
  icon?: React.ReactNode;
  rootPrefixCls?: string;
  eventKey?: string;
}

export const MenuItem: React.FC<MenuItemProps> = props => {
  const { rootPrefixCls, className, style, disabled, icon, children, eventKey } = props;
  const { onSelect, selectedKey } = useContext(MenuContext);
  const classes = classNames(`${rootPrefixCls}-item`, className, {
    [`${rootPrefixCls}-item-disabled`]: disabled,
    [`${rootPrefixCls}-item-selected`]: eventKey === selectedKey,
  });
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const info = {
        key: eventKey as string,
        domEvent: e,
      };
      if (!disabled) {
        onSelect!(info);
      }
    },
    [eventKey, disabled, onSelect],
  );
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>): boolean | undefined => {
      const { keyCode } = e;
      if (keyCode === 13 && !disabled) {
        onSelect!({ key: eventKey as string, domEvent: e });
        return true;
      }
      return undefined;
    },
    [eventKey, disabled, onSelect],
  );

  return (
    <li
      role="menuitem"
      className={classes}
      style={style}
      onClick={handleClick}
      onKeyDown={onKeyDown}
    >
      {icon}
      {children}
    </li>
  );
};

export default MenuItem;
