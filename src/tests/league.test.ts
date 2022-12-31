import { describe, expect, it } from 'vitest';
import { api } from '../api';
import { streak } from '../api/helpers';
import { leagueApi } from '../api/league';

describe('league', () => {
  it('2021 rosters', async () => {
    let rosters = await api.league.rostersByYear(2021);
    expect(rosters.length).toBe(10);
  })

  it('2021 playoffs', async () => {
    let results = await leagueApi.standingsByYear(2021);
    expect(results).toBeDefined();
  })

  it('streak of wins', () => {
    let longestWins = streak('WWLWWWLWWWW', 'wins');
    expect(longestWins).toBe(4);
  })

  it('streak of losses', () => {
    let longestLosses = streak('WWWWWWWW', 'losses');
    expect(longestLosses).toBe(0);
  })
})