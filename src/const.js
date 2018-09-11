import os from 'os';
import libpath from 'path';

export const MEMI_PREFIX = libpath.resolve(os.homedir(), '.memi');

export const MEMI_MODULES_FOLDER =
  process.platform !== 'win32'
    ? libpath.resolve(MEMI_PREFIX, 'lib', 'node_modules')
    : libpath.resolve(MEMI_PREFIX, 'node_modules');
