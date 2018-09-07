import os from 'os';
import libpath from 'path';

export const MEMI_PREFIX = libpath.resolve(os.homedir(), '.memi');

export const MEMI_MODULES_FOLDER =
  process.platform !== 'win32'
    ? libpath.resolve(MEMI_PREFIX, 'lib', 'node_modules')
    : libpath.resolve(MEMI_PREFIX, 'node_modules');

// https://github.com/npm/cli/blob/59e5056a2129cb2951f4ff3b657ada20657f01a7/lib/config/defaults.js#L92-L105
export const GLOBAL_PREFIX =
  process.env.PREFIX ||
  (process.platform === 'win32'
    ? libpath.dirname(process.execPath)
    : process.env.DESTDIR
      ? libpath.join(process.env.DESTDIR, libpath.dirname(libpath.dirname(process.execPath)))
      : libpath.dirname(libpath.dirname(process.execPath)));

// https://github.com/npm/cli/blob/59e5056a2129cb2951f4ff3b657ada20657f01a7/lib/npm.js#L418-L426
export const GLOBAL_MODULES_FOLDER =
  process.platform !== 'win32'
    ? libpath.resolve(GLOBAL_PREFIX, 'lib', 'node_modules')
    : libpath.resolve(GLOBAL_PREFIX, 'node_modules');
