import findUp from 'find-up';

const MEMIFILE_BASENAME = ['Memifile', 'memifile', '.Memifile', '.memifile'];
const MEMIFILE_EXTENSION = ['', '.js', '.es6', '.mjs'];

export async function findMemifile() {
  const MEMIFILE_NAME = [];
  for (const ext of MEMIFILE_EXTENSION) {
    for (const basename of MEMIFILE_BASENAME) {
      MEMIFILE_NAME.push(`${basename}${ext}`);
    }
  }

  return findUp(MEMIFILE_NAME);
}
