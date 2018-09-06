import fs from 'fs-extra';
import libpath from 'path';
import { addPath } from 'app-module-path';

import { MEMI_MODULES_FOLDER } from '../const';

export async function initialize() {
  if (!(await fs.pathExists(MEMI_MODULES_FOLDER))) {
    await fs.ensureDir(MEMI_MODULES_FOLDER);
  }
  addPath(libpath.resolve(MEMI_MODULES_FOLDER, 'node_modules'));
}
