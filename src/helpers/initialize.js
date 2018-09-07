import fs from 'fs-extra';
import updateNotifier from 'update-notifier';
import { addPath } from 'app-module-path';

import { MEMI_MODULES_FOLDER } from '../const';

const pkg = require('../../package.json');

export async function initialize() {
  updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24,
  }).notify();

  if (!(await fs.pathExists(MEMI_MODULES_FOLDER))) {
    await fs.ensureDir(MEMI_MODULES_FOLDER);
  }

  addPath(MEMI_MODULES_FOLDER);
}
