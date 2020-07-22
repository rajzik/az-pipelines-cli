import { cleanTempFolder } from './cleanTempFolder';
import { getConfig } from './getConfig';
import { cloneRepo } from './git';

export async function cloneRepoAndGetConfig(url: string) {
  await cleanTempFolder();
  await cloneRepo(url);
  return getConfig();
}

export default cloneRepoAndGetConfig;
