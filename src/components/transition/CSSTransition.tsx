import React, { useRef, useContext, useMemo, useCallback } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ConfigContext } from '../config-provider';

type AnimationName = string;

type AnimationTuple = [AnimationName, AnimationName];

interface OwnProps {
  timeout?: number;
  in?: boolean;
  /** 指定在进场和退场时使用的动画，如果指定字符串则进场和退场将使用相同的动画，你也可以使用数组为两者指定不同的动画，
   * 值为 `animate.css` 中包含的动画名称，注意不需要前缀。
   */
  animation?: AnimationName | AnimationTuple;
  unmountOnExit?: boolean;
  prefixCls?: string;
}

export type TransitionProps<T extends HTMLElement = HTMLElement> = OwnProps & CSSTransitionProps<T>;

/**
 * CSSTransition 主要是对 `react-transition-group` 库中 CSSTransition 组件的二次封装。
 *
 * 新版的 CSSTransition 支持所有原先的功能，同时还结合 `animate.css` 提供默认的动画效果。
 *
 * 以下是几个常用属性的简单说明，更多信息可参考 [React Transition Group](https://reactcommunity.org/react-transition-group/)。
 */
export const CSSTransition: React.FC<TransitionProps> = props => {
  const {
    children,
    classNames,
    animation,
    nodeRef,
    timeout = 0,
    prefixCls: customizePrefixCls,
    ...restProps
  } = props;
  const defaultNodeRef = useRef(null);
  const { getPrefixCls } = useContext(ConfigContext);

  const transitionClasses = useMemo(() => {
    if (!animation) return {};

    let retAnimation: AnimationTuple;
    const prefixCls = getPrefixCls('animate', customizePrefixCls);

    if (!Array.isArray(animation)) {
      retAnimation = [animation, animation];
    } else {
      retAnimation = animation as AnimationTuple;
    }

    return {
      enter: `${prefixCls}-animated`,
      enterActive: `${prefixCls}-${retAnimation[0]}`,
      exit: `${prefixCls}-animated`,
      exitActive: `${prefixCls}-${retAnimation[1]}`,
    };
  }, [animation, customizePrefixCls, getPrefixCls]);

  const getChildProps = useCallback(() => {
    const childProps = {};
    if (!nodeRef) {
      Object.assign(childProps, {
        ref: defaultNodeRef,
      });
    }
    if (animation) {
      const duration = `${timeout}ms`;

      Object.assign(childProps, {
        style: {
          animationDuration: duration,
          WebkitAnimationDuration: duration,
        },
      });
    }
    return childProps;
  }, [timeout, animation, nodeRef]);

  return (
    <ReactCSSTransition
      timeout={timeout}
      nodeRef={nodeRef || defaultNodeRef}
      classNames={animation ? transitionClasses : classNames}
      {...restProps}
    >
      {React.cloneElement(
        children as React.FunctionComponentElement<TransitionProps>,
        getChildProps(),
      )}
    </ReactCSSTransition>
  );
};

CSSTransition.defaultProps = {
  unmountOnExit: true,
};

export default CSSTransition;
