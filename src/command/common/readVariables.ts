import fsExtra from 'fs-extra';
import yaml from 'yaml';
import { IVariables } from '../../types';

export async function readVariables(variablePath: string): Promise<IVariables> {
  const variablesYaml = await fsExtra.readFile(variablePath);
  return yaml.parse(variablesYaml.toString());
}

export default readVariables;
