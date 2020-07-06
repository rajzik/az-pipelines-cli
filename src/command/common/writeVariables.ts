import fsExtra from 'fs-extra';
import path from 'path';
import { IConfig } from '../../types';

export async function writeVariables({ rootDir, variables }: IConfig, variableContent: string) {
  await fsExtra.writeFile(path.join(rootDir, variables), variableContent);
}
