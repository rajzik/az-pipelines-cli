import { prompt } from 'enquirer';
import { EnquirerPrompt, IVariable } from '../../types';
import { mapTypeToEnquirer } from '../../utils';

export async function promptUser(variables: IVariable[]) {
  const options = variables.map(mapTypeToEnquirer) as EnquirerPrompt;
  return prompt<{ [key: string]: unknown }>(options);
}

export default promptUser;
