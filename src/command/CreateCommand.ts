/* eslint-disable class-methods-use-this */
import { Arg, Command, Config } from '@boost/cli';
import path from 'path';
import { convertVariablesObjectToYaml } from '../utils';
import {
  cloneRepoAndGetConfig,
  copyFiles,
  promptUser,
  readVariables,
  writeVariables,
} from './common';
import { REPO_PATH } from './constants';

type CustomParams = [string];

@Config('create', 'Create project pipelines', {
  aliases: [],
  deprecated: false,
})
export default class CreateCommand extends Command {
  @Arg.Params<CustomParams>({
    description: 'String',
    label: 'url',
    required: true,
    type: 'string',
  })
  async run(url: string) {
    const config = await cloneRepoAndGetConfig(url);
    await copyFiles(config);
    const { variables } = await readVariables(
      path.join(REPO_PATH, config.rootDir, config.variables),
    );
    const answers = await promptUser(variables);
    const yaml = convertVariablesObjectToYaml(answers);
    await writeVariables(config, yaml);
  }
}
