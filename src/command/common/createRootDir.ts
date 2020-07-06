import fsExtra from 'fs-extra';

export async function createRootDir(rootDir: string) {
  if (rootDir === '.') return;

  await fsExtra.mkdirp(rootDir);
}
