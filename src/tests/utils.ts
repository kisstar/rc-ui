import { CSSProperties } from 'react';

export const camelToKebabCase = (str: string): string =>
  str.replace(/([A-Z])/g, matched => `-${matched.toLocaleLowerCase()}`);

export const getStyleStr = (style: CSSProperties): string => {
  return Object.keys(style).reduce((ret, cur) => {
    return `${ret}${camelToKebabCase(cur)}: ${style[cur as keyof CSSProperties]};`;
  }, '');
};
