import React from 'react';
import { render, RenderResult } from '@testing-library/react';
// import { CSSTransition } from 'react-transition-group';
import mountTest from '../../../tests/mountTest';
import { getStyleStr } from '../../../tests/utils';
import { CSSTransition } from '..';
import { TransitionProps } from '../CSSTransition';

const prefixCls = 'ks-animate';

describe('CSSTransition', () => {
  it('renders correctly', () => {
    expect(
      <CSSTransition timeout={1000}>
        <div>I will receive fade-* classes</div>
      </CSSTransition>,
    ).toMatchSnapshot();
  });

  mountTest(() => (
    <CSSTransition timeout={1000} animation="flash">
      <div className="box" />
    </CSSTransition>
  ));

  it('should apply classes at each transition state', async done => {
    let count = 0; // make sure that each hook is called
    let resolve: () => void;
    const p = new Promise(res => {
      resolve = res;
    });
    const nodeRef = React.createRef<HTMLDivElement>();
    const initProps = {
      in: false,
      nodeRef,
      classNames: 'test',
      timeout: 10,
    };
    const newProps = {
      ...initProps,
      in: true,

      onEnter() {
        count += 1;
        expect((nodeRef.current as HTMLDivElement).className).toEqual('test-enter');
      },

      onEntering() {
        count += 1;
        expect((nodeRef.current as HTMLDivElement).className).toEqual(
          'test-enter test-enter-active',
        );
      },

      onEntered() {
        count += 1;
        expect((nodeRef.current as HTMLDivElement).className).toEqual('test-enter-done');
        resolve();
      },
    };
    const retProps = {
      ...initProps,

      onExit() {
        count += 1;
        expect((nodeRef.current as HTMLDivElement).className).toEqual('test-exit');
      },

      onExiting() {
        count += 1;
        expect((nodeRef.current as HTMLDivElement).className).toEqual('test-exit test-exit-active');
      },

      onExited() {
        expect((nodeRef.current as HTMLDivElement).className).toEqual('test-exit-done');
        expect(count).toEqual(5);
        done();
      },
    };
    const TestComponent = (props: TransitionProps) => (
      <CSSTransition {...props}>
        <div ref={nodeRef} />
      </CSSTransition>
    );
    const wrapper = render(<TestComponent {...initProps} />);

    wrapper.rerender(<TestComponent {...newProps} />);
    await p;
    wrapper.rerender(<TestComponent {...retProps} />);
  });

  it('should automatically create noderef and pass it to origin CSSTransition', done => {
    const initProps = {
      in: false,
      classNames: 'test',
      timeout: 10,
    };
    const newProps = {
      ...initProps,
      in: true,

      onEntered() {
        done();
      },
    };
    const TestComponent = (props: TransitionProps) => (
      <React.StrictMode>
        <CSSTransition {...props}>
          <div>Text</div>
        </CSSTransition>
      </React.StrictMode>
    );
    const wrapper = render(<TestComponent {...initProps} />);

    // 由于 React 并没有将在严格模式下使用 findDOMNode 方法视为错误（通过 console.error 提示），所以这个的期望永远可以通过
    // 如果这个 case 失败，你将在控制台看到相应的提示信息
    expect(() => {
      wrapper.rerender(<TestComponent {...newProps} />);
    }).not.toThrow();
  });

  it('should support the animation provided by animate.css', async done => {
    // prefixCls
    let count = 0; // make sure that each hook is called
    let resolve: () => void;
    const p = new Promise(res => {
      resolve = res;
    });
    let wrapper: RenderResult;
    let element: HTMLElement;
    const initProps = {
      in: false,
      timeout: 10,
    };
    const testStyle = {
      animationDuration: `${initProps.timeout}ms`,
    };
    const newProps = {
      ...initProps,
      in: true,

      onEnter() {
        element = wrapper.getByText('Text');
        count += 1;
        expect(element.className).toEqual(`${prefixCls}-animated`);
        expect(element).toHaveStyle(getStyleStr(testStyle));
      },

      onEntering() {
        count += 1;
        expect(element.className).toEqual(`${prefixCls}-animated ${prefixCls}-testIn`);
        expect(element).toHaveStyle(getStyleStr(testStyle));
      },

      onEntered() {
        count += 1;
        expect(element.className).toEqual('');
        expect(element).toHaveStyle(getStyleStr(testStyle));
        resolve();
      },
    };
    const retProps = {
      ...initProps,
      in: false,

      onExit() {
        count += 1;
        expect(element.className).toEqual(`${prefixCls}-animated`);
        expect(element).toHaveStyle(getStyleStr(testStyle));
      },

      onExiting() {
        count += 1;
        expect(element.className).toEqual(`${prefixCls}-animated ${prefixCls}-testOut`);
        expect(element).toHaveStyle(getStyleStr(testStyle));
      },

      onExited() {
        expect(element.className).toEqual('');
        expect(element).toHaveStyle(getStyleStr(testStyle));
        expect(count).toEqual(5);
        done();
      },
    };
    const TestComponent = (props: TransitionProps) => (
      <CSSTransition {...props} animation={['testIn', 'testOut']}>
        <div>Text</div>
      </CSSTransition>
    );

    wrapper = render(<TestComponent {...initProps} />);
    wrapper.rerender(<TestComponent {...newProps} />);
    await p;
    wrapper.rerender(<TestComponent {...retProps} />);
  });
});
