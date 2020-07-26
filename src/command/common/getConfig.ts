import { cosmiconfig } from 'cosmiconfig';
import { moduleName, REPO_PATH, searchPlaces } from '../../constants';
import { IConfig } from '../../types';

export async function getConfig(): Promise<IConfig> {
  const { config } = (await cosmiconfig(moduleName, { searchPlaces }).search(REPO_PATH)) ?? {};
  const { files, rootDir = '.', targetDir, variables } = config;

  return {
    files,
    rootDir,
    targetDir: targetDir || rootDir,
    variables,
  };
}

export default getConfig;
