import yaml from 'yaml';
import { EnquirerPrompt, IVariable } from './types';

/* eslint-disable @typescript-eslint/no-require-imports */
const pkg = require('../package.json');

export function getVersion() {
  return pkg.version;
}

export async function asyncForEach<T extends unknown>(
  array: T[],
  callback: (current: T, index: number, array: T[]) => Promise<unknown>,
) {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

export function mapTypeToEnquirer({ value, name }: IVariable): EnquirerPrompt {
  if (typeof value === 'boolean') {
    return {
      name,
      type: 'confirm',
      message: `Select ${name}`,
      initial: value,
    };
  }
  return {
    type: 'input',
    initial: value,
    name,
    message: `Write ${name}`,
  };
}

export function convertVariablesObjectToYaml(
  obj: { [key: string]: unknown },
  extraVariables: IVariable[] = [],
) {
  return yaml.stringify({
    variables: [
      ...Object.keys(obj).map(name => ({
        name,
        value: obj[name],
      })),
      ...extraVariables,
    ],
  });
}
