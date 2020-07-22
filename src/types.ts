import { prompt } from 'enquirer';

export interface IConfig {
  rootDir: string;
  targetDir?: string;
  variables: string;
  files: string | string[];
}

export interface IVariable {
  name: string;
  value: string | boolean;
}

export interface IVariables {
  variables: IVariable[];
}

export type EnquirerPrompt = Parameters<typeof prompt>[0];
