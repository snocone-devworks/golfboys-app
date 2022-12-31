import { describe, expect, it } from 'vitest';
import { api } from '../api';

describe('user', () => {
  it('JeremyHayworth user', async () => {
    let user = await api.user.byId('421353405504552960');
    expect(user.display_name).toBe('JeremyHayworth');
  })

  it('JeremyHayworth 2021 roster', async () => {
    let roster = await api.user.rosterByYear('421353405504552960', 2021);
    expect(roster).toBeDefined();
  })
})