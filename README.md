# @rajzik/az-pipelines-cli

Azure pipelines tool that can create or update pipelines via npx command

## Usage

We support two commands `update` and `create`.

All commands needs url to the template pipelines.

**Create command:**

```bash
npx @rajzik/az-pipelines-cli create git@github.com:rajzik/pipelines.git
```

**Update command:**

```bash
npx @rajzik/az-pipelines-cli update git@github.com:rajzik/pipelines.git
```

## Setting up template pipelines repository

Add config to your repository

### .azpipelinesrc.js

```js
module.exports = {
  rootDir: '.',
  targetDir: 'tools/pipelines',
  variables: 'variables.yml',
  files: 'azure-pipelines.yml',
};
```

**Config interface:**

```ts
export interface IConfig {
  rootDir: string; // Root directory of template repository
  targetDir?: string; // Destination directory of target project
  variables: string; // Variable path
  files: string | string[]; // File/files which you want to copy to the target project
}
```

### Variables.yml

Only supported format of variables is as follow

```yml
variables:
  - name: nodeVersion
    value: '12.x'
```

### azure-pipelines.yml

```yml
variables:
  - template: variables.yml

stages:
  - stage: code_validation
    displayName: Primary code validation
    dependsOn: []
    condition: not(contains(variables['Build.SourceVersionMessage'], 'ci skip'))
    jobs:
      - template: templates/jobs/validation.yml
        parameters:
          useYarn: ${{ variables['useYarn'] }}
          fixNpmAndYarn: ${{ variables['fixNpmAndYarn'] }}
          fixNpmTimeout: ${{ variables['fixNpmTimeout'] }}
          nodeVersion: ${{ variables['nodeVersion'] }}
```
