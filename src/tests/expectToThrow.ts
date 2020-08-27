/* eslint-disable no-console */
// https://github.com/facebook/jest/issues/5785#issuecomment-590198706

interface ErrorLogger {
  (message?: any, ...optionalParams: any[]): void;
  mockImplementation: (...args: any[]) => void;
  mockRestore: () => void;
}

export default (func: (...args: any[]) => any) => {
  // Even though the error is caught, it still gets printed to the console
  // so we mock that out to avoid the wall of red text.
  jest.spyOn(console, 'error');
  (console.error as ErrorLogger).mockImplementation(() => {});

  expect(func).toThrow();

  (console.error as ErrorLogger).mockRestore();
};
