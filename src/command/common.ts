import fs from 'fs/promises';
import path from 'path';
import { REPO_PATH } from './constants';
import { cloneRepo } from './git';

export async function cleanTempFolder() {
  await fs.rmdir(REPO_PATH, { recursive: true });
}

export async function getConfig() {
  return (await import(path.join(REPO_PATH, '.azpipelinesrc.js'))).default;
}

export async function cloneRepoAndGetConfig(url: string) {
  await cleanTempFolder();
  await cloneRepo(url);
  return getConfig();
}
