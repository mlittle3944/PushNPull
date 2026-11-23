import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({ profile: null, payload: null, error: null }))
vi.mock('../auth/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'test-user' }, profile: state.profile, refreshProfile: vi.fn() }),
}))
vi.mock('react-router-dom', () => ({ useNavigate: () => vi.fn() }))
vi.mock('../supabaseClient', () => ({
  supabase: {
    from: () => ({
      upsert: (payload) => {
        state.payload = payload
        return { select: () => ({ single: async () => ({
          data: payload,
          error: state.error ?? (payload.display_name === null
            ? new Error('null value in column "display_name" violates not-null constraint')
            : null),
        }) }) }
      },
    }),
  },
}))

import Onboarding from '../pages/Onboarding'
import { saveProfile } from './api'

function selectedEquipment() {
  const html = renderToStaticMarkup(<Onboarding />)
  return [...html.matchAll(/<input\b[^>]*>/g)]
    .map(([tag]) => tag)
    .filter((tag) => tag.includes('type="checkbox"') && /\bchecked(?:=|\s|>)/.test(tag))
    .map((tag) => tag.match(/value="([^"]*)"/)[1])
}

beforeEach(() => { state.profile = null; state.payload = null; state.error = null })

describe('PR4 profile save regression tests — issue 78', () => {
  it('saves an explicitly blank optional name with a not-null database column', async () => {
    await expect(saveProfile('test-user', { display_name: null, goal: 'general_fitness' }))
      .resolves.toMatchObject({ id: 'test-user', display_name: '', goal: 'general_fitness' })
  })
  it('preserves a supplied display name', async () => {
    await expect(saveProfile('test-user', { display_name: 'Xavier QA' }))
      .resolves.toMatchObject({ display_name: 'Xavier QA' })
  })
  it('does not add a name to a partial update that omitted it', async () => {
    await saveProfile('test-user', { goal: 'build_muscle' })
    expect(state.payload).not.toHaveProperty('display_name')
  })
  it('keeps an empty string name valid', async () => {
    await expect(saveProfile('test-user', { display_name: '' }))
      .resolves.toMatchObject({ display_name: '' })
  })
  it('still reports a database failure', async () => {
    state.error = new Error('Database unavailable')
    await expect(saveProfile('test-user', { display_name: 'Xavier QA' }))
      .rejects.toThrow('Database unavailable')
  })
})

describe('PR4 saved equipment regression tests', () => {
  it('keeps a saved empty equipment selection empty when editing', () => {
    state.profile = { equipment: [] }
    expect(selectedEquipment()).toEqual([])
  })
  it('keeps a saved single equipment selection', () => {
    state.profile = { equipment: ['cables'] }
    expect(selectedEquipment()).toEqual(['cables'])
  })
  it('uses defaults when there is no saved profile', () => {
    expect(selectedEquipment()).toEqual(['machines', 'dumbbells', 'bodyweight'])
  })
  it('uses defaults when the equipment field is missing', () => {
    state.profile = {}
    expect(selectedEquipment()).toEqual(['machines', 'dumbbells', 'bodyweight'])
  })
  it('uses defaults when saved equipment is null', () => {
    state.profile = { equipment: null }
    expect(selectedEquipment()).toEqual(['machines', 'dumbbells', 'bodyweight'])
  })
})
