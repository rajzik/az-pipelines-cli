/* eslint-disable class-methods-use-this */
import { Arg, Command, Config } from '@boost/cli';
import { cloneRepoAndGetConfig } from './common';

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

    console.log(config, 'sup mate');
  }
}
