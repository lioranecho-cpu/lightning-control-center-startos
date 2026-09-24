import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'lightning-control-center',
  title: 'Lightning Control Center',
  license: 'MIT',
  packageRepo: 'https://github.com/lioranecho-cpu/lightning-control-center-startos',
  upstreamRepo: 'https://github.com/lioranecho-cpu/lightning-control-center',
  marketingUrl: 'https://github.com/lioranecho-cpu/lightning-control-center',
  donationUrl: 'https://github.com/lioranecho-cpu/lightning-control-center',
  description: { short, long },
  volumes: ['data'],
  images: {
    lcc: {
      source: { dockerTag: 'sparkielabs/lightning-control-center:0.1.9' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
