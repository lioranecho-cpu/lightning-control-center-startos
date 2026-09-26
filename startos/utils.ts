// LCC listens on port 8765
export const uiPort = 8765

// Path inside the LCC subcontainer where LND's `main` volume is mounted
// read-only (see main.ts). Only the macaroon under it is actually used —
// LND's own tls.cert on that volume isn't useful for the cross-container
// REST call (see the comment in main.ts on LND_REST_HOST).
export const lndMount = '/mnt/lnd'
export const lndMacaroonPath = `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon`

// Mirrored from lnd-startos's startos/interfaces.ts (controlHostId, restPort)
// — not importable across packages, so kept in sync by hand here.
export const lndControlHostId = 'control'
export const lndRestPort = 8080
