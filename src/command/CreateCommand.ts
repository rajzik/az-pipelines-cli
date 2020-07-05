/* eslint-disable class-methods-use-this */
import { Arg, Command, Config } from '@boost/cli';
import { convertVariablesObjectToYaml } from '../utils';
import {
  cloneRepoAndGetConfig,
  copyFiles,
  promptUser,
  readVariables,
  writeVariables,
} from './common';

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
    const variables = await readVariables(config);
    const answers = await promptUser(variables);
    const yaml = convertVariablesObjectToYaml(answers);
    await writeVariables(config, yaml);
  }
}
