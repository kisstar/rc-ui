import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CSSTransition } from '../components/transition';
import { TransitionProps } from '../components/transition/CSSTransition';
import './styles/transition.scss';

export default {
  title: '动画/CSSTransition',
  component: CSSTransition,
  argTypes: {
    timeout: {
      description:
        'The duration of the transition, in milliseconds. Required unless addEndListener is provided.',
      table: {
        type: {
          summary: 'number | {}',
          detail: 'number | { appear?: number; enter?: number; exit?: number }',
        },
      },
    },
    classNames: {
      description: 'The animation `classNames` applied to the component as it enters or exits.',
    },
  },
} as Meta;

const Template: Story<TransitionProps> = args => (
  <CSSTransition {...args}>
    <div className="box" />
  </CSSTransition>
);

export const ClassNames = Template.bind({});
ClassNames.args = {
  in: false,
  classNames: 'fade',
  timeout: 1000,
};

export const Animate = Template.bind({});
Animate.args = {
  in: false,
  animation: ['fadeIn', 'fadeOut'],
  timeout: 1000,
};
