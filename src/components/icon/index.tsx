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

/**
 * Icon 组件主要使用的是由 FontAwesome 提供的免费图标。
 *
 * See what icons are available：https://fontawesome.com/icons
 *
 * 除了直接使用 Icon 组件外，您还可以通过暴露的 createFromIconfontCN 方法自定义 IconFont 组件。
 *
 * How it works：https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d0091c141&helptype=code
 */
export const Icon: FC<IconProps> = props => {
  const { style, className, prefixCls: customizePrefixCls, ...restProps } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('icon', customizePrefixCls);
  const classes = classNames(prefixCls, className);

  return <FontAwesomeIcon style={style} className={classes} {...restProps} />;
};

export default Icon;
