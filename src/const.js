import os from 'os';
import libpath from 'path';

export const MEMI_PREFIX = libpath.resolve(os.homedir(), '.memi');

export const MEMI_MODULES_FOLDER = libpath.resolve(MEMI_PREFIX, 'node_modules');
