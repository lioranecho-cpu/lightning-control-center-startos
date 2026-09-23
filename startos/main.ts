import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Lightning Control Center!'))

  return sdk.Daemons.of(effects).addDaemon('lcc-daemon', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'lcc' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'data',
        subpath: null,
        mountpoint: '/app/data',
        readonly: false,
      }),
      'lcc-subcontainer',
    ),
    exec: {
      command: ['uvicorn', 'lcc_api:app', '--host', '0.0.0.0', '--port', String(uiPort)],
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
