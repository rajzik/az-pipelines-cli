import path from 'path';
import { REPO_PATH } from '../../constants';
import { IConfig } from '../../types';

export async function getConfig(): Promise<IConfig> {
  const { files, rootDir = '.', targetDir, variables } = (
    await import(path.join(REPO_PATH, '.azpipelinesrc.js'))
  ).default;

  return {
    files,
    rootDir,
    targetDir: targetDir || rootDir,
    variables,
  };
}

export default getConfig;
