import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  lnd: {
    kind: 'running',
    // Broad enough to cover the REST v1/v2 endpoints LCC uses
    // (getinfo, balances, channels, fwdinghistory, router/send,
    // chanpolicy, graph/*) without pinning to one build.
    versionRange: '>=0.20.1-beta:3',
    healthChecks: ['lnd'],
  },
}))
