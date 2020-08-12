import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ConfigContext } from '../config-provider';

export { default as createFromIconfontCN } from './IconFont';

// See what icons are available：https://fontawesome.com/icons
library.add(fas);

export interface IconProps extends FontAwesomeIconProps {
  className?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
}

const Icon: FC<IconProps> = props => {
  const { style, className, prefixCls: customizePrefixCls, ...restProps } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('icon', customizePrefixCls);
  const classes = classNames(prefixCls, className);

  return <FontAwesomeIcon style={style} className={classes} {...restProps} />;
};

export default Icon;
