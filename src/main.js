import { initialize, findMemifile, importMemifile, installDependencies } from './helpers';

async function main() {
  const [, , taskName = 'start', ...argv] = process.argv;
  await initialize();

  const memifilePath = await findMemifile();
  if (!memifilePath) {
    throw new Error('Memifile is not exists in current directory.');
  }
  await installDependencies(memifilePath);

  const tasks = await importMemifile(memifilePath);
  if (!taskName in tasks || typeof tasks[taskName] !== 'function') {
    throw new Error(`${taskName} is not exists in Memifile.`);
  }

  await tasks[taskName](...argv);
}

main().catch(err => console.error(err.stack || err));
