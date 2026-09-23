export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Lightning Control Center!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'The Lightning Control Center dashboard': 4,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
