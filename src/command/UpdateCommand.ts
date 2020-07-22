/* eslint-disable class-methods-use-this */
import { Arg, Command, Config } from '@boost/cli';
import path from 'path';
import { REPO_PATH } from '../constants';
import { IVariable, IVariables } from '../types';
import { convertVariablesObjectToYaml } from '../utils';
import {
  cloneRepoAndGetConfig,
  copyFiles,
  promptUser,
  readVariables,
  writeVariables,
} from './common';

type CustomParams = [string];

@Config('update', 'Update project pipelines', {
  aliases: [],
  deprecated: false,
})
export default class UpdateCommand extends Command {
  @Arg.Params<CustomParams>({
    description: 'String',
    label: 'url',
    required: true,
    type: 'string',
  })
  async run(url: string) {
    const config = await cloneRepoAndGetConfig(url);

    await copyFiles(config);
    const variables = await readVariables(path.join(REPO_PATH, config.rootDir, config.variables));
    const localVariables = await readVariables(path.join(config.rootDir, config.variables));
    const mergedVariables = this.mergeVariables(localVariables, variables);
    const newVariables = this.findNewVariables(localVariables, variables);
    const answers = await promptUser(newVariables);

    const yaml = convertVariablesObjectToYaml(answers, mergedVariables);
    await writeVariables(config, yaml);
  }

  private mergeVariables(
    { variables: oldVariables }: IVariables,
    { variables: newVariables }: IVariables,
  ) {
    const variables = this.removeOldProperties(oldVariables, newVariables);

    return variables;
  }

  private removeOldProperties(oldVariables: IVariable[], newVariables: IVariable[]) {
    return oldVariables.filter(oldVariable =>
      newVariables.find(newVariable => oldVariable.name === newVariable.name),
    );
  }

  private findNewVariables(
    { variables: oldVariables }: IVariables,
    { variables: newVariables }: IVariables,
  ) {
    return newVariables.filter(
      oldVariable => !oldVariables.find(newVariable => oldVariable.name === newVariable.name),
    );
  }
}
