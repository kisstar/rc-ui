/* eslint-disable react/button-has-type */

import React from 'react';
import classNames from 'classnames';
import { isUndef } from '../../lib/utils';

export type ButtonHTMLType = 'button' | 'submit' | 'reset';

export type ButtonType = 'primary' | 'link';

export type ButtonSize = 'large' | 'sm';

export interface BaseButtonProps {
  htmlType?: ButtonHTMLType;
  type?: ButtonType;
  size?: ButtonSize;
  href?: string;
  danger?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export type ButtonProps = BaseButtonProps;

const Button: React.FC<ButtonProps> = props => {
  const { htmlType, type, size, href, danger, disabled, className, children } = props;

  const classes = classNames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    'btn-danger': danger,
    'btn-disabled': disabled && !isUndef(href),
  });

  const linkNode = (
    <a className={classes} href={href}>
      {children}
    </a>
  );

  const buttonNode = (
    <button type={htmlType} className={classes} disabled={disabled}>
      {children}
    </button>
  );

  return isUndef(href) ? buttonNode : linkNode;
};

Button.defaultProps = {
  htmlType: 'button',
};

export default Button;
