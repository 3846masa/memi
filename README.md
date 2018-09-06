# MEMI

[![NPM](https://nodei.co/npm/memi.png?compact=true)](https://www.npmjs.com/package/memi)

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

1. Put Memifile on working directory
    - MEMI loads Memifile named as below
        - `Memifile` / `.memifile`
        - `Memifile.{js,mjs}` / `.memifile.{js,mjs}`
2. Write task functions as module
    - See [example](./example)
      ```js
      import inquirer from 'inquirer';
      import cowsay from 'cowsay';

      export default {
        async start() {
          const { text } = await inquirer.prompt([{
            name: 'text',
            message: "How's it going?",
          }]);
          this.echo(text);
        },
        echo(text = 'Hello Memi!') {
          console.log(cowsay.say({ text }));
        }
      };
      ```
3. Run task
    ```bash
    memi <taskname> [<args>...]
    ```

### Tips: Useful libraries when you write tasks

- [execa - npm](https://www.npmjs.com/package/execa)
  - A better `child_process`
- [fs-extra - npm](https://www.npmjs.com/package/fs-extra)
  - Node.js: extra methods for the fs object like copy(), remove(), mkdirs()
- [shelljs - npm](https://www.npmjs.com/package/shelljs)
  - Portable Unix shell commands for Node.js
- [simple-git - npm](https://www.npmjs.com/package/simple-git)
  - A light weight interface for running git commands in any node.js application.
- [glob - npm](https://www.npmjs.com/package/glob)
  - Match files using the patterns the shell uses, like stars and stuff.
- [opn - npm](https://www.npmjs.com/package/opn)
  - A better node-open. Opens stuff like websites, files, executables. Cross-platform.
- [inquirer - npm](https://www.npmjs.com/package/inquirer/v/5.0.0)
  - A collection of common interactive command line user interfaces.

## Note

- Auto-installed dependencies are in `$HOME/.memi/node_modules`.
  - For Windows: `%USERPROFILE%\.memi\node_modules`.

## Contribute

PRs accepted.

## What's MEMI?

MEMI have been named after Memi Kakizaki (柿崎芽実).

## License

MIT © 3846masa
