import simpleGit from 'simple-git';
import { BASE_DIR, REPO_PATH } from './constants';

const git = simpleGit({
  baseDir: BASE_DIR,
  binary: 'git',
  maxConcurrentProcesses: 6,
});

export async function cloneRepo(url: string) {
  await git.clone(url, REPO_PATH);
}

export default git;
