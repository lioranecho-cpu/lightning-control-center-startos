import { setupManifest } from '@start9labs/start-sdk'
import { depLndDescription, long, short } from './i18n'

export const manifest = setupManifest({
  id: 'lightning-control-center',
  title: 'Lightning Control Center',
  license: 'MIT',
  packageRepo: 'https://github.com/lioranecho-cpu/lightning-control-center-startos',
  upstreamRepo: 'https://github.com/lioranecho-cpu/lightning-control-center',
  marketingUrl: 'https://satslist.shop',
  donationUrl: 'https://satslist.shop',
  description: { short, long },
  volumes: ['lcc-data'],
  images: {
    'lcc': {
      source: { dockerTag: 'sparkielabs/lightning-control-center:latest' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    lnd: {
      description: depLndDescription,
      optional: false,
      metadata: {
        title: 'LND',
        icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/refs/heads/master/icon.svg',
      },
    },
  },
})
