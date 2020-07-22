import fsExtra from 'fs-extra';
import path from 'path';
import { REPO_PATH } from '../../constants';
import { IConfig } from '../../types';
import { asyncForEach } from '../../utils';
import { createDestinationDirectory } from './createDestinationDirectory';

function convertToArray<T>(possiblyArray?: T | T[]): T[] {
  if (!possiblyArray) {
    return [];
  }

  if (Array.isArray(possiblyArray)) return possiblyArray;

  return [possiblyArray];
}

export async function copyFiles({ rootDir, targetDir, files }: IConfig) {
  await createDestinationDirectory(targetDir);

  const filesToCopy = convertToArray(files);

  await asyncForEach(filesToCopy, async current => {
    await fsExtra.copy(path.join(REPO_PATH, rootDir, current), path.join(targetDir, current));
  });
}

export default copyFiles;
