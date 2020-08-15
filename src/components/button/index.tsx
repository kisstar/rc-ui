/* eslint-disable react/button-has-type */

import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { isUndef } from '../../lib/utils';

export type ButtonHTMLType = 'button' | 'submit' | 'reset';

export type ButtonType = 'primary' | 'link';

export type ButtonSize = 'large' | 'sm';

export interface BaseButtonProps {
  /** 设置按钮类型 */
  type?: ButtonType;
  /** 设置按钮大小 */
  size?: ButtonSize;
  /** 设置危险按钮 */
  danger?: boolean;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
}

export type AnchorButtonProps = {
  /** 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 */
  href: string;
  /** 相当于 a 链接的 target 属性，href 存在时生效 */
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLElement>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  /** 设置 button 原生的 type 值，可选值请参考 HTML 标准 */
  htmlType?: ButtonHTMLType;
  /** 点击按钮时的回调 */
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

/**
 * 按钮用于开始一个即时操作。
 *
 * 在 Rc-UI 中提供了三种按钮：主按钮、默认按钮、链接按钮，以及危险、禁用两种状态。
 */
export const Button: React.FC<ButtonProps> = props => {
  const {
    htmlType,
    type,
    size,
    href,
    danger,
    className,
    children,
    prefixCls: customizePrefixCls,
    ...restProps
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-danger`]: danger,
  });

  const linkNode = (
    <a className={classes} href={href} {...restProps}>
      {children}
    </a>
  );

  const buttonNode = (
    <button type={htmlType} className={classes} {...restProps}>
      {children}
    </button>
  );

  return isUndef(href) ? buttonNode : linkNode;
};

Button.defaultProps = {
  htmlType: 'button',
};

export default Button;
