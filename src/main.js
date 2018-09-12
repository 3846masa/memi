import { initialize, findMemifile, importMemifile, installDependencies } from './helpers';

async function main() {
  const [, , taskName, ...argv] = process.argv;
  await initialize();

  const memifilePath = await findMemifile();
  if (!memifilePath) {
    throw new Error("Memifile doesn't exist.");
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
    throw new Error(`Task "${taskName}" not found.`);
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
