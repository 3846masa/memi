import { initialize, findMemifile, importMemifile, installDependencies } from './helpers';

async function main() {
  const [, , taskName, ...argv] = process.argv;
  await initialize();

  const memifilePath = await findMemifile();
  if (!memifilePath) {
    throw new Error('Memifile is not exists in current directory.');
  }
  await installDependencies(memifilePath);

  const tasks = await importMemifile(memifilePath);
  if (!taskName) {
    const taskNameList = Object.keys(tasks);
    console.log(`Usage: memi <taskname> [<args>...]`);
    console.log(`Tasks: ${taskNameList.join(',\x20')}`);
    process.exit(1);
  }
  if (!taskName in tasks || typeof tasks[taskName] !== 'function') {
    throw new Error(`${taskName} is not exists in Memifile.`);
  }

  try {
    await tasks[taskName](...argv);
  } catch (err) {
    console.error(err.stack || err);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err.message ? `Error: ${err.message}` : err);
  process.exit(1);
});
