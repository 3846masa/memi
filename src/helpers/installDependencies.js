import fs from 'fs-extra';
import libpath from 'path';
import util from 'util';
import npm from 'npm';
import konan from 'konan';
import devNull from 'dev-null';
import resolveFrom from 'resolve-from';
import ora from 'ora';

import { MEMI_PREFIX } from '../const';

/**
 * @param {string} filePath
 * @returns {Promise<string[]>}
 */
export async function _findNotInstalledDependencies(filePath) {
  const source = await fs.readFile(filePath, 'utf8');
  const { strings: moduleList } = konan(source);
  const notInstalled = [];

  for (const moduleName of moduleList) {
    const resolvedPath = resolveFrom.silent(libpath.dirname(filePath), moduleName);

    if (resolvedPath) {
      if (/^\./.test(moduleName)) {
        // If path is relative, resolve dependencies recursive.
        notInstalled.push(...(await _findNotInstalledDependencies(resolvedPath)));
      }
    } else {
      if (/^\./.test(moduleName)) {
        throw new Error(`Coundn't resolve ${moduleName} from ${filePath}.`);
      } else {
        notInstalled.push(moduleName);
      }
    }
  }

  return notInstalled.map(moduleName => {
    const paths = moduleName.split('/');
    return /^@/.test(moduleName) ? paths.slice(0, 2).join('/') : paths[0];
  });
}

/**
 * @param {string} filePath
 */
export async function installDependencies(filePath) {
  const notInstalled = await _findNotInstalledDependencies(filePath);

  if (notInstalled.length !== 0) {
    const spinner = ora('Installing dependencies').start();
    const originalLogger = console.log;
    console.log = () => {};

    try {
      await util.promisify(npm.load)({
        progress: false,
        loglevel: 'silent',
        logstream: devNull(),
        prefix: MEMI_PREFIX,
      });
      await util.promisify(npm.commands.install)(notInstalled);
      spinner.clear();
    } catch (err) {
      console.log = originalLogger;
      spinner.fail(err.message);
      throw err;
    }
    console.log = originalLogger;
  }
}
