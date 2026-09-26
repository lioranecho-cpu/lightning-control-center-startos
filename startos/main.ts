import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  lndControlHostId,
  lndMacaroonPath,
  lndMount,
  lndRestPort,
  uiPort,
} from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Lightning Control Center!'))

  // Address LCC dials LND's REST interface on, through the StartOS bridge.
  // NOTE: the bridge terminates TLS with its own device cert, not LND's
  // tls.cert (see lnd-startos's startos/utils.ts, the `selfRestUrl` comment:
  // "the bridge answers REST with the proxy's device cert, failing the
  const lndRestBridge = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'lnd',
      hostId: lndControlHostId,
      internalPort: lndRestPort,
    })
    .const()

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'lcc' },
    sdk.Mounts.of()
      .mountVolume({
        volumeId: 'lcc-data',
        subpath: null,
        mountpoint: '/data',
        readonly: false,
      })
      .mountDependency({
        dependencyId: 'lnd',
        volumeId: 'main',
        subpath: null,
        mountpoint: lndMount,
        readonly: true,
      }),
    'lcc-container',
  )

  return sdk.Daemons.of(effects).addDaemon('lcc-daemon', {
    subcontainer,
    exec: {
      command: ['uvicorn', 'lcc_api:app', '--host', '0.0.0.0', '--port', '8765'],
      env: {
        LND_REST_HOST: `https://${lndRestBridge}`,
        LND_MACAROON_PATH: lndMacaroonPath,
        // LND's tls.cert carries the full StartOS chain (leaf + Local
        // Intermediate CA + Local Root CA), so it works as the CA bundle for
        // the bridge's own cert too - same issuer, and the bridge cert lists
        // the bridge IP in its SANs. lcc_api.py's _lnd_verify() passes this
        // straight to requests' verify=, giving a fully verified connection.
        LND_TLS_CERT_PATH: `${lndMount}/tls.cert`,
        // data.json (password, settings) must live on the persistent volume
        // mounted at /data (see mountVolume below), not the app image itself —
        // otherwise it resets to a fresh first-boot state on every upgrade.
        LCC_DATA_DIR: '/data',
      },
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
