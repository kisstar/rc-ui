import React from 'react';
import { render } from '@testing-library/react';

export default function mountTest(Component: React.ComponentType) {
  describe('mount and unmount', () => {
    it(`${
      Component.displayName || 'component'
    } could be updated and unmounted without errors`, () => {
      const wrapper = render(<Component />);
      expect(() => {
        wrapper.rerender(<Component />);
        wrapper.unmount();
      }).not.toThrow();
    });
  });
}
