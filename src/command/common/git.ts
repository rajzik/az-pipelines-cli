import simpleGit from 'simple-git';
import { BASE_DIR, REPO_PATH } from '../../constants';

const git = simpleGit({
  baseDir: BASE_DIR,
  binary: 'git',
  maxConcurrentProcesses: 6,
});

export async function cloneRepo(url: string, branch = '') {
  await git.clone(url, REPO_PATH);

  if (branch) {
    const internalGitProcess = simpleGit({
      baseDir: REPO_PATH,
      binary: 'git',
      maxConcurrentProcesses: 6,
    });
    await internalGitProcess.checkout(branch);
  }
}

export default git;
