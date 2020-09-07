/* eslint-disable class-methods-use-this */
import { Arg, Command, Config } from '@boost/cli';
import path from 'path';
import { REPO_PATH } from '../constants';
import { convertVariablesObjectToYaml } from '../utils';
import {
  cleanTempFolder,
  cloneRepoAndGetConfig,
  copyFiles,
  promptUser,
  readVariables,
  writeVariables,
} from './common';

type CustomParams = [string, string];

@Config('create', 'Create project pipelines', {
  aliases: [],
  deprecated: false,
})
export default class CreateCommand extends Command {
  @Arg.Params<CustomParams>(
    {
      description: 'String',
      label: 'url',
      required: true,
      type: 'string',
    },

    {
      description: 'branch to checkout',
      label: 'branch',
      required: false,
      type: 'string',
      default: '',
    },
  )
  async run(url: string, branch: string) {
    const config = await cloneRepoAndGetConfig(url, branch);

    await copyFiles(config);

    const { variables } = await readVariables(
      path.join(REPO_PATH, config.rootDir, config.variables),
    );
    const answers = await promptUser(variables);
    const yaml = convertVariablesObjectToYaml(answers);
    await writeVariables(config, yaml);
    await cleanTempFolder();
  }
}
