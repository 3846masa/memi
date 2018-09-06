# MEMI

> Simple task-runner with JavaScript.

MEMI is simple task-runner, inspired by [mimorisuzuko/memi].

- Write tasks with JavaScript
- Auto install dependencies

[mimorisuzuko/memi]: https://github.com/mimorisuzuko/memi

## Install

```bash
npm i -g memi
# -- OR --
yarn global add memi
```

## Usage

1. Put Memifile on working directory.
    - Memifile name allows `Memifile`, `.memifile.js`
2. Write task functions as module
    - Legacy module
      ```js
      var cowsay = require('cowsay');

      module.exports = {
        start: function () {
          this.echo();
        },
        echo: function () {
          console.log(cowsay.say({
            text: 'Hello Memi!',
          }));
        }
      };
      ```
    - ES module
      ```js
      import cowsay from 'cowsay';

      export default {
        start() {
          this.echo();
        },
        echo() {
          console.log(cowsay.say({
            text: 'Hello Memi!',
          }));
        }
      };
      ```
3. Run task
    ```bash
    memi <taskname> [<args>...]
    ```

## Note

- Auto-installed dependencies are in `$HOME/.memi/node_modules`.
  - For Windows: `%USERPROFILE%\.memi\node_modules`.

## Contribute

PRs accepted.

## What's MEMI?

MEMI have been named after Memi Kakizaki (柿崎芽実).

## License

MIT © 3846masa
