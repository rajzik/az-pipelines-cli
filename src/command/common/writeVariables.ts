import fsExtra from 'fs-extra';
import path from 'path';
import { IConfig } from '../../types';

export async function writeVariables({ targetDir, variables }: IConfig, variableContent: string) {
  await fsExtra.writeFile(path.join(targetDir, variables), variableContent);
}

export default writeVariables;
