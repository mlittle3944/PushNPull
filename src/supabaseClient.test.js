import { describe, it, expect } from 'vitest'
import { supabase } from './supabaseClient'

describe('supabaseClient', () => {
  it('creates a valid Supabase client', () => {
    expect(supabase).toBeDefined()
    expect(typeof supabase.from).toBe('function')
  })
})