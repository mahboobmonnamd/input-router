export type RouterSettings = {
  enabled?: boolean
  model?: string
  thresholdTokens?: number
}

export type RouterEntry = {
  id: string
  source: string
  tool: string
  mode: 'summary' | 'filter'
  before: number
  after: number
  spent: number
}

declare module 'claude-code' {
  interface PluginState {
    'input-router': {
      settings: RouterSettings
      entries: RouterEntry[]
      task: string
    }
  }
}
