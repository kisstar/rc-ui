# Rc-UI

[![CircleCI Status][circleci_image][circleci_url]] [![FOSSA Status][fossa_imge]][fossa_url] [![codecov][codecov_image]][codecov_url] [![NPM version][npm_image]][npm_url]

UI component library built with React Hooks.

## Install

```bash
# use npm
npm install @ks/rc-ui

# or use yarn
yarn add @ks/rc-ui
```

## Usage

```js
// introduce components on demand
import { Button } from '@ks/rc-ui';

const App = () => <Button type="primary">CLICK ME</Button>;

// and import style manually
import '@ks/rc-ui/dist/index.css';
```

## Development scripts

```bash
# verify the code format and syntax in the project.
yarn lint

# launches the test runner in the interactive watch mode.
yarn test

# write a more friendly commit message
yarn commit
```

## License

[MIT](https://github.com/storybookjs/storybook/blob/master/LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fkisstar%2Frc-ui.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fkisstar%2Frc-ui?ref=badge_large)

[circleci_image]: https://img.shields.io/circleci/build/github/kisstar/rc-ui/master
[circleci_url]: https://app.circleci.com/pipelines/github/kisstar/rc-ui
[codecov_image]: https://codecov.io/gh/kisstar/rc-ui/branch/master/graph/badge.svg
[codecov_url]: https://codecov.io/gh/kisstar/rc-ui
[fossa_imge]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fkisstar%2Frc-ui.svg?type=shield
[fossa_url]: https://app.fossa.com/projects/git%2Bgithub.com%2Fkisstar%2Frc-ui?ref=badge_shield
[npm_image]: https://img.shields.io/npm/v/@ks/rc-ui
[npm_url]: http://npmjs.org/package/@ks/rc-ui
