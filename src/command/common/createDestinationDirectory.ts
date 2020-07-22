import fsExtra from 'fs-extra';

export async function createDestinationDirectory(rootDir: string) {
  if (rootDir === '.') return;

  await fsExtra.mkdirp(rootDir);
}

export default createDestinationDirectory;
