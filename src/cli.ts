import { Program } from '@boost/cli';
import { CreateCommand, UpdateCommand } from './command';
import { getVersion } from './utils';

const cli = new Program({
  bin: 'az-pipelines',
  name: 'Azure pipeline utility',
  version: getVersion(),
});

cli.register(new UpdateCommand()).register(new CreateCommand());

export default cli;
