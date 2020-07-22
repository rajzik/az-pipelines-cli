import fsExtra from 'fs-extra';
import { REPO_PATH } from '../../constants';

export async function cleanTempFolder() {
  await fsExtra.remove(REPO_PATH);
}

export default cleanTempFolder;
