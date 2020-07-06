import path from 'path';
import { IConfig } from '../../types';
import { REPO_PATH } from '../constants';

export async function getConfig(): Promise<IConfig> {
  const { main, rootDir = '.', variables, monorepo } = (
    await import(path.join(REPO_PATH, '.azpipelinesrc.js'))
  ).default;

  return {
    main,
    rootDir,
    variables,
    monorepo,
  };
}
