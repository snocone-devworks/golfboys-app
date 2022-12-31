import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import OverallLeagueHistory from './OverallLeagueHistory';
import YearlyLeagueHistory from './YearlyLeagueHistory';

const LeagueHistoryPage = () => {
  const { name } = useParams();

  if (!name) return null;
  if (name === 'overall') return <OverallLeagueHistory />;

  return (
    <YearlyLeagueHistory year={Number(name)} />
  )
}

export default LeagueHistoryPage