/**
 * 以 ant-design 的方式为组件提供统一的全局化配置
 * ant-design is licensed MIT. https://github.com/ant-design/ant-design
 */
import React from 'react';
import { ConfigConsumer, ConfigContext, ConfigConsumerProps } from './context';

export interface ConfigProviderProps {
  /** 设置统一样式前缀。注意：这将不会应用由 antd 提供的默认样式 */
  prefixCls?: string;
}

/**
 * 为组件提供统一的全局化配置。
 *
 * ConfigProvider 使用 React 的 context 特性，只需在应用外围包裹一次即可全局生效。
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = props => {
  const getPrefixClsWrapper = (context: ConfigConsumerProps) => {
    return (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls } = props;

      if (customizePrefixCls) return customizePrefixCls;

      const mergedPrefixCls = prefixCls || context.getPrefixCls('');

      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    };
  };

  const renderProvider = (context: ConfigConsumerProps) => {
    const { children } = props;
    const config: ConfigConsumerProps = {
      ...context,
      getPrefixCls: getPrefixClsWrapper(context),
    };

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
  };

  return <ConfigConsumer>{context => renderProvider(context)}</ConfigConsumer>;
};

export { ConfigConsumer, ConfigContext };

export default ConfigProvider;
