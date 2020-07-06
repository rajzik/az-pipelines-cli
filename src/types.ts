import { prompt } from 'enquirer';

export interface IConfig {
  rootDir: string;
  variables: string;
  main: string;
  monorepo?: string | boolean;
}

export interface IVariable {
  name: string;
  value: string | boolean;
}

export interface IVariables {
  variables: IVariable[];
}

export type EnquirerPrompt = Parameters<typeof prompt>[0];
