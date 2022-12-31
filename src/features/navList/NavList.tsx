import { NavItem, NavSection } from '@snoconedev/mantine-ui'
import { MdAssignmentInd, MdGroups, MdHome } from 'react-icons/md';
import { GiAmericanFootballPlayer } from 'react-icons/gi';
import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../../api';

const NavList = () => {
  const [leagueYears, setLeagueYears] = useState<number[]>([]);

  useEffect(() => {
    let values = [...api.league.leagueIds].map(l => l.year);
    values.sort((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });

    setLeagueYears(values);
  }, [])
  return (
    <>
    <NavItem path='/' exact title='Home' icon={<MdHome size='1.4rem' />} />   
    <NavSection title='League History'>
      <NavItem path={`/league-history/overall`} title='Overall' />
      {leagueYears.map(year => (
        <NavItem key={year} path={`/league-history/${year}`} title={`${year}`} />
      ))}
    </NavSection>
    <NavItem path='/managers' title='Managers' icon={<MdGroups size='1.6rem' />} />
    <NavItem path='/player-history' title='Player History' icon={<GiAmericanFootballPlayer size='1.4rem' />} />
    </>
  )
}

export default NavList