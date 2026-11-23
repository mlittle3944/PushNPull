import { describe, it, expect, vi} from 'vitest'
import { validateSupabaseConfig } from './supabaseConfig'

describe('validateSupabaseConfig', () => {
  it('provides a helpful error when Supabase configuration is missing', async () => {
    vi.resetModules()

    vi.stubEnv('VITE_SUPABASE_URL', '')
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '')

    try {
      await expect(
        import('../supabaseClient.js')
      ).rejects.toThrow(
        /Missing Supabase configuration/
      )
    } finally {
      vi.unstubAllEnvs()
      vi.resetModules()
    }
  })

  it('rejects missing Supabase URL', () => {
    expect(() =>
      validateSupabaseConfig('', 'test-key')
    ).toThrow('Missing Supabase configuration')
  })

  it('rejects missing Supabase key', () => {
    expect(() =>
      validateSupabaseConfig('https://example.supabase.co', '')
    ).toThrow('Missing Supabase configuration')
  })

  it('accepts valid configuration', () => {
    expect(() =>
      validateSupabaseConfig('https://example.supabase.co', 'test-key')
    ).not.toThrow()
  })
})
