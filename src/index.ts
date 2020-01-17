import * as core from "@actions/core"
import deployToFtp from "@isthatcentered/deploy-to-ftp"

const castBooleanString = (boolean: string) => /true/i.test(boolean)

const run = async () => {
  try {
    const config = {
      user: core.getInput("user", { required: true }),
      password: core.getInput("password", { required: true }),
      port: core.getInput("port"),
      host: core.getInput("host", { required: true }),
      path: core.getInput("path", { required: true }),
      into: core.getInput("into", { required: true }),
      cleanupExisting: castBooleanString(core.getInput("cleanupExisting")),
    }

    core.info(`Deploying ${config.path} folder`)

    const status = await deployToFtp(config.path)(config)

    if (status.type === "failure") {
      throw status.error
    }

    core.info(`Deploy successfull`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
