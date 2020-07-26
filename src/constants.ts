import { tmpdir } from 'os';
import path from 'path';

export const moduleName = 'azpipelines';

export const BASE_DIR = tmpdir();

export const REPO_PATH = path.join(BASE_DIR, 'tmpRepo');

export const searchPlaces = [
  'package.json',
  `.${moduleName}rc`,
  `.${moduleName}rc.json`,
  `.${moduleName}rc.yaml`,
  `.${moduleName}rc.yml`,
  `.${moduleName}rc.js`,
];
