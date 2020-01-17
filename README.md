# Dist to FTP GitHub Action

Automatically deploy your dist folder via ftp

_(Or whatever your build folder is called)_

## Usage examples

(You'll probably need this: [How to use secrets in an action](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets#using-encrypted-secrets-in-a-workflow))

### TLDR;

```yaml
name: Deploy app
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Deploy app
        uses: isthatcentered/dist-to-ftp@v1
        with:
          user: ${{ secrets.FTP_USER }} # Ftp user Ex:
          password: ${{ secrets.FTP_PASSWORD }} # Ftp password Ex:
          host: ${{ secrets.FTP_HOST }} # Ftp host Ex:
          port: ${{ secrets.FTP_PORT }} # (optional) FTP port, defaults to 21
          path: dist # Folder to deploy Ex: apps/frontend/dist or dist
          into: web # Where to place the files in your ftp
          cleanupExisting: true # (Optional), Remove already existing files inside FTP destination folder (`into` parameter)
```

### Full on

```yaml
name: Deploy app
on:
  push:
    branches:
      - master
jobs:
  build:
    name: Build App
    runs-on: [ubuntu-latest]
    steps:
      - name: Import commit files
        uses: actions/checkout@master
      - name: Get yarn cache # https://github.com/actions/cache/blob/master/examples.md#node---yarn
        id: yarn-cache
        run: echo "::set-output name=dir::$(yarn cache dir)"
      - uses: actions/cache@v1
        with:
          path: ${{ steps.yarn-cache.outputs.dir }}
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-
      - name: Install Dependencies
        run: yarn install
      - name: Build
        run: yarn build
      - name: Upload bundle
        uses: actions/upload-artifact@master
        with:
          name: my_artifact_name # Upload artifact with name `dist`
          path: dist # Upload content of `dist` folder
      - name: Debug Files
        run: ls
  deploy:
    name: Deploy App
    runs-on: [ubuntu-latest]
    needs: [build]
    steps:
      - name: Download bundle
        uses: actions/download-artifact@master
        with:
          name: my_artifact_name # Download artifact named `my_artifact_name` (matches build step: Upload bundle)
          path: dist # Optional, downloads to current working directory under folder {artifact_name} if not specified
      - name: Debug Files
        run: ls
      - name: Upload to FTP
        uses: isthatcentered/dist-to-ftp@master
        with:
          user: ${{ secrets.FTP_USER }} # Ftp user Ex:
          password: ${{ secrets.FTP_PASSWORD }} # Ftp password Ex:
          host: ${{ secrets.FTP_HOST }} # Ftp host Ex:
          port: ${{ secrets.FTP_PORT }} # (optional) FTP port, defaults to 21
          path: dist # Folder to deploy Ex: apps/frontend/dist or dist
          into: web # Where to place the files in your ftp
          cleanupExisting: true # (Optional), Remove already existing files inside FTP destination folder (`into` parameter)
```

## Inputs

```yaml
inputs:
  # Required:
  user:
    required: true
    description: Ftp user
  password:
    required: true
    description: Ftp password
  host:
    description: FTP host url
    required: true
  into:
    description: Where to place the files in your ftp
    required: true
  path:
    description: Path to your build folder (usually "./public" or "./dist")
    default: dist
    required: true

  # Optional
  port:
    description: FTP port
    required: false
    default: "21"
  cleanupExisting:
    required: false
    default: true
    description: Remove existing file inside FTP destination folder
```

## Going further

- [Core concepts for GitHub Actions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/core-concepts-for-github-actions)
- [Workflow syntax for GitHub Actions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions)
- [Creating and using encrypted secrets in Github Actions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)
- [Running a workflow on a specific event AND branch](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#example-using-multiple-events-with-activity-types-or-configuration)
- [Sharing data between jobs using artifacts](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/persisting-workflow-data-using-artifacts#sharing-data-between-workflow-runs)
- [Caching dependencies](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/caching-dependencies-to-speed-up-workflows)
