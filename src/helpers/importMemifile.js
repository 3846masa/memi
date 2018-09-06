/**
 * @param {string} filePath
 */
export async function importMemifile(filePath) {
  const imported = await import(filePath);
  const tasks = Object.assign(
    Object.create(null),
    'default' in imported && typeof imported.default === 'object' ? imported.default : imported,
  );
  return tasks;
}
