/* eslint-disable react/button-has-type */

import React from 'react';
import classNames from 'classnames';
import { isUndef } from '../../lib/utils';

export type ButtonHTMLType = 'button' | 'submit' | 'reset';

export type ButtonType = 'primary' | 'link';

export type ButtonSize = 'large' | 'sm';

export interface BaseButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  danger?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLElement>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button: React.FC<ButtonProps> = props => {
  const { htmlType, type, size, href, danger, className, children, ...restProps } = props;

  const classes = classNames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    'btn-danger': danger,
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
