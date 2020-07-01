/* eslint-disable @typescript-eslint/no-require-imports */
const pkg = require('../package.json');

export function getVersion() {
  return pkg.version;
}
