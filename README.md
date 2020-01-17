# Dist to FTP GitHub Action

Automatically deploy your dist folder via ftp

_(Or whatever your build folder is called)_

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

## Example usage

uses: actions/hello-world-javascript-action@v1
with:
who-to-greet: 'Mona the Octocat'
