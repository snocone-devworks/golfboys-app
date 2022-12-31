import { Card, Group, Stack, Switch, Text } from '@mantine/core';
import { useNotify } from '@snoconedev/mantine-ui';
import React, { useEffect, useMemo, useState } from 'react'
import { MdEmojiEvents, MdMilitaryTech } from 'react-icons/md';
import { api } from '../../api';
import PageLoader from '../../components/PageLoader';
import { StandingOverall } from '../../types/Standing'
import Podium, { PodiumPlace } from './components/Podium';
import Table from './components/OverallTable';

const OverallLeagueHistory = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const notify = useNotify();
  const [standings, setStandings] = useState<StandingOverall[]>([]);

  useEffect(() => {
    setLoading(true);
    api.league.standingsOverall()
    .then(response => {
      console.log(response);
      setStandings([...response]);
      setLoading(false);
    })
    .catch(error => {
      if (notify) notify('error', 'Error loading standings', false);
      console.log(error);
      setStandings([]);
      setLoading(false);
    });
  }, [])

  const podiumPlace = (position: number): PodiumPlace | undefined => {
    let standing = [...standings].find(s => {
      return s.positionsRegularRank === position;
    });

    if (!standing) return undefined;

    return {
      losses: standing.stats.losses,
      userAvatar: standing.userAvatar,
      userName: standing.userName,
      points: standing.stats.points,
      wins: standing.stats.wins,
      averageFinish: standing.positionsRegularAverage
    };
  }

  if (loading) {
    return (
      <PageLoader 
        containerStyle={{paddingTop: '10vh'}} 
        message='Loading...' 
        size='lg' 
      />
    )
  }

  return (
    <Stack>
      <Podium 
        first={podiumPlace(1)}
        second={podiumPlace(2)}
        third={podiumPlace(3)}
      />
      <Table rows={standings} />
    </Stack>
  )
}

export default OverallLeagueHistory