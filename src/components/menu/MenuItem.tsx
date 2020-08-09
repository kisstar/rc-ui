import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import MenuContext from './MenuContext';

export interface MenuItemProps {
  key: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  rootPrefixCls?: string;
  eventKey?: string;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { rootPrefixCls, className, style, disabled, children, eventKey } = props;
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
      {children}
    </li>
  );
};

MenuItem.displayName = '__KS_MenuItem__';

export default MenuItem;
