import { tmpdir } from 'os';
import path from 'path';

export const BASE_DIR = tmpdir();

export const REPO_PATH = path.join(BASE_DIR, 'tmpRepo');
