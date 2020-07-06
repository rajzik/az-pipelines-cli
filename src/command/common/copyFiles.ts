import fsExtra from 'fs-extra';
import path from 'path';
import { IConfig } from '../../types';
import { asyncForEach } from '../../utils';
import { REPO_PATH } from '../constants';
import { createRootDir } from './createRootDir';

export async function copyFiles(config: IConfig) {
  await createRootDir(config.rootDir);
  const dir = await fsExtra.readdir(path.join(REPO_PATH, config.rootDir));
  const filteredFiles = dir.filter(current => current !== config.variables);
  await asyncForEach(filteredFiles, async current => {
    await fsExtra.copy(
      path.join(REPO_PATH, config.rootDir, current),
      path.join(config.rootDir, current),
    );
  });
}
