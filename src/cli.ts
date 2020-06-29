import chalk from 'chalk';
import parseArgv from 'minimist';
import { VALID_MODES } from './constants';

function printHelp() {
  console.log(
    chalk.blue(`
    usage @rajzik/az-pipelines-cli create <url to repo>

    mode:
      - create
      - update
    url:
      - Url to your repository
  `),
  );
}

export default function cli() {
  const args = parseArgv(process.argv.slice(2));
  const [mode, url] = args._;

  if (!mode || !url) {
    printHelp();
    throw new Error('Arguments missing');
  }

  if (!VALID_MODES.includes(mode)) {
    throw new Error('Mode has to be create or update');
  }

  console.log(args);
}
