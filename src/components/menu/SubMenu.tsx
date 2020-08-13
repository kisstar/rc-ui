import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import MenuContext from './MenuContext';
import { MenuItemProps } from './MenuItem';

export interface SubMenuProps {
  title: string;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  rootPrefixCls?: string;
  eventKey?: string;
}

interface SubMenuType extends React.FC<SubMenuProps> {
  mouseTimeout: any;
}

const SubMenu: SubMenuType = props => {
  const { rootPrefixCls, style, className, title, disabled, icon, children } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const { mode, selectedKey } = useContext(MenuContext);
  const classes = classNames(`${rootPrefixCls}-submenu`, className, {
    [`${rootPrefixCls}-submenu-disabled`]: disabled,
    [`${rootPrefixCls}-submenu-selected`]: isSelected,
    [`${rootPrefixCls}-submenu-open`]: isOpened,
  });

  const handleClick = () => {
    if (disabled || mode === 'horizontal') return;
    setIsOpened(!isOpened);
  };

  const onKeyDown = () => {
    if (disabled || mode === 'horizontal') return;
    setIsOpened(!isOpened);
  };

  const handleMouseEnter = () => {
    if (disabled || mode === 'vertical') return;
    clearTimeout(SubMenu.mouseTimeout);
    SubMenu.mouseTimeout = setTimeout(() => {
      setIsOpened(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (disabled || mode === 'vertical') return;
    clearTimeout(SubMenu.mouseTimeout);
    SubMenu.mouseTimeout = setTimeout(() => {
      setIsOpened(false);
    }, 100);
  };

  const renderChild = () => {
    const keys: string[] = [];

    const retChild = (
      <ul
        role="menu"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${rootPrefixCls} ${rootPrefixCls}-vertical`}
      >
        {React.Children.map(children, child => {
          const childElement = child as React.FunctionComponentElement<MenuItemProps>;
          const { type, key } = childElement;
          const { displayName } = type;
          const strKey = key as string;

          keys.push(strKey);

          if (displayName === '__KS_MenuItem__') {
            return React.cloneElement(childElement, {
              eventKey: strKey,
              rootPrefixCls,
            });
          }

          throw Error("SubMenu's child can only be MenuItem");
        })}
      </ul>
    );

    const newSelect = keys.includes(selectedKey);

    if (newSelect !== isSelected) {
      setIsSelected(newSelect);
    }

    if (!isOpened) {
      return null;
    }

    return retChild;
  };

  return (
    <li style={style} className={classes}>
      <div
        role="button"
        tabIndex={-1}
        className={`${rootPrefixCls}-submenu-title`}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {icon}
        {title}
      </div>
      {renderChild()}
    </li>
  );
};

SubMenu.mouseTimeout = 0;

SubMenu.displayName = '__KS_SubMenu__';

export default SubMenu;
