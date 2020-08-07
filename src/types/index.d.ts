import '@testing-library/react';

declare module '@testing-library/react' {
  // eslint-disable-next-line import/prefer-default-export
  export const fireEvent: any;
}
