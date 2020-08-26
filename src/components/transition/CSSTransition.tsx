import React, { useRef, useContext, useMemo } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ConfigContext } from '../config-provider';

type AnimationName = string;

type AnimationTuple = [AnimationName, AnimationName];

interface OwnProps {
  animation?: AnimationName | AnimationTuple;
  prefixCls?: string;
}

type TransitionProps = OwnProps & CSSTransitionProps;

const CSSTransition: React.FC<TransitionProps> = props => {
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

  const getChildProps = () => {
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
  };

  return (
    <ReactCSSTransition
      timeout={timeout}
      nodeRef={defaultNodeRef || nodeRef}
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
