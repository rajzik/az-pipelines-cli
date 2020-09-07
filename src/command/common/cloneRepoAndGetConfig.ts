import { cleanTempFolder } from './cleanTempFolder';
import { getConfig } from './getConfig';
import { cloneRepo } from './git';

export async function cloneRepoAndGetConfig(url: string, branch: string) {
  await cleanTempFolder();
  await cloneRepo(url, branch);
  return getConfig();
}

export default cloneRepoAndGetConfig;
