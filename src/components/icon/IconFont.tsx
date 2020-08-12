// Iconfont
//
// Manually forked from ant-design-icons/packages/icons-react/
// How it works：https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d0091c141&helptype=code
//
// ant-design-icons is licensed MIT. https://github.com/ant-design/ant-design-icons

import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

export interface CustomIconOptions {
  scriptUrl?: string | string[];
}

export interface IconFontProps {
  type: string;
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  prefixCls?: string;
}

const customCache = new Set<string>();

function isValidCustomScriptUrl(scriptUrl: string): boolean {
  return Boolean(typeof scriptUrl === 'string' && scriptUrl.length && !customCache.has(scriptUrl));
}

function createScriptUrlElements(scriptUrls: string[], index: number = 0): void {
  const currentScriptUrl = scriptUrls[index];
  if (isValidCustomScriptUrl(currentScriptUrl)) {
    const script = document.createElement('script');
    script.setAttribute('src', currentScriptUrl);
    script.setAttribute('data-namespace', currentScriptUrl);
    if (scriptUrls.length > index + 1) {
      script.onload = () => {
        createScriptUrlElements(scriptUrls, index + 1);
      };
      script.onerror = () => {
        createScriptUrlElements(scriptUrls, index + 1);
      };
    }
    customCache.add(currentScriptUrl);
    document.body.appendChild(script);
  }
}

export default function create(options: CustomIconOptions = {}): React.FC<IconFontProps> {
  const { scriptUrl = {} } = options;

  /**
   * DOM API required, make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */
  if (
    scriptUrl &&
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function'
  ) {
    if (Array.isArray(scriptUrl)) {
      // 因为 IconFont 资源会把 svg 插入 before，所以前加载相同 type 会覆盖后加载
      // 倒叙插入，为了数组覆盖顺序
      createScriptUrlElements(scriptUrl.reverse());
    } else {
      createScriptUrlElements([scriptUrl as string]);
    }
  }

  const Iconfont: React.FC<IconFontProps> = props => {
    const { type, style = {}, className, prefixCls: customizePrefixCls, spin, rotate } = props;
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('icon', customizePrefixCls);
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-spin`]: !!spin,
    });
    const svgStyle = rotate
      ? {
          msTransform: `rotate(${rotate}deg)`,
          transform: `rotate(${rotate}deg)`,
        }
      : {};
    const retStyle = Object.assign(svgStyle, style);

    return (
      <svg className={classes} style={retStyle} aria-hidden="true">
        <use xlinkHref={`#icon-${type}`} />
      </svg>
    );
  };

  Iconfont.displayName = 'Iconfont';

  return Iconfont;
}
