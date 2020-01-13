# Gatsby to FTP GitHub Action

Deploy your gatsby site via ftp automatically

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

  # Optional
  port:
    description: FTP port
    required: false
    default: "21"
  path:
    description: Path to Gatsby's build folder (usually "public")
    default: public
    required: true
  cleanupExisting:
    required: false
    default: false
    description: Remove existing file inside FTP destination folder
```

## Example usage

uses: actions/hello-world-javascript-action@v1
with:
who-to-greet: 'Mona the Octocat'
