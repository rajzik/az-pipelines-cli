import { prompt } from 'enquirer';
import fsExtra from 'fs-extra';
import path from 'path';
import yaml from 'yaml';
import { EnquirerPrompt, IConfig, IVariables } from '../types';
import { asyncForEach, mapTypeToEnquirer } from '../utils';
import { REPO_PATH } from './constants';
import { cloneRepo } from './git';

export async function cleanTempFolder() {
  await fsExtra.remove(REPO_PATH);
}

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

export async function createRootDir(rootDir: string) {
  if (rootDir === '.') return;

  await fsExtra.mkdirp(rootDir);
}

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

export async function readVariables(config: IConfig) {
  const variablesYaml = await fsExtra.readFile(
    path.join(REPO_PATH, config.rootDir, config.variables),
  );
  return yaml.parse(variablesYaml.toString());
}

export async function cloneRepoAndGetConfig(url: string) {
  await cleanTempFolder();
  await cloneRepo(url);
  return getConfig();
}

export async function promptUser({ variables }: IVariables) {
  const options = variables.map(mapTypeToEnquirer) as EnquirerPrompt;
  return prompt<{ [key: string]: unknown }>(options);
}

export async function writeVariables({ rootDir, variables }: IConfig, variableContent: string) {
  await fsExtra.writeFile(path.join(rootDir, variables), variableContent);
}
