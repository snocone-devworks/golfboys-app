import { Avatar, Card, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { useDeviceSize, useThemeColors } from '@snoconedev/mantine-ui';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo } from 'react'

export type PodiumPlace = {
  losses: number;
  points: number;
  userAvatar?: string;
  userName?: string;
  wins: number;
  averageFinish: number;
}

type Props = {
  first?: PodiumPlace;
  second?: PodiumPlace;
  third?: PodiumPlace;
}

const Podium = ({ first, second, third }: Props) => {
  return (
    <>    
    <Grid style={{margin: '0rem'}}>
      <PodiumCard 
        item={first}
        position={1}
      />
      <PodiumCard 
        item={second}
        position={2}
      />
      <PodiumCard 
        item={third}
        position={3}
      />      
    </Grid>

    </>
  )
}

type PodiumCardProps = {
  item: PodiumPlace | undefined;
  position: 1 | 2 | 3;
}

const PodiumCard = ({ item, position }: PodiumCardProps) => {
  const { deviceSize } = useDeviceSize();
  const isSmall = useMemo<boolean>(() => ['xs', 'sm'].includes(deviceSize), [deviceSize]);
  const shadowColor = useMemo<string>(() => {
    if (position === 1) return '#cfe094';
    if (position === 2) return '#a0a19f';
    return '#677348';
  }, [position])
  const colors = useThemeColors();
  if (!item) return null;

  return (
    <Grid.Col xs={12} md={4} style={{padding: '1rem', paddingTop: isSmall ? '3rem' : '4rem'}}>
      <AnimatePresence mode='wait'>
        <motion.div
          key={position}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{y: 0, opacity: 1 }}
          exit={{ y: '-100vh', opacity: 0 }}
          transition={{ delay: position * 0.3, type: 'spring', bounce: 0.3, damping: 15 }}
        >
          <Card
            radius='lg'
            style={{filter: `drop-shadow(0 4px 8px ${shadowColor})`, overflow: 'visible', width: '100%'}}
          >
            <Group position='center' style={{marginTop: isSmall ? '-3rem' : '-4rem'}}>
              <Avatar size={isSmall ? 'lg' : 'xl'} radius='xl' src={`https://sleepercdn.com/avatars/${item.userAvatar}`} alt={item.userName} />
            </Group>
            <Group position='apart' align='flex-start' style={{marginTop: '-1rem'}}>
              <Title order={isSmall ? 4 : 2}>
                {position === 1 ? '1st' : position === 2 ? '2nd' : '3rd'}
              </Title>
              <Title order={isSmall ? 4 : 2}>
                {item.userName}
              </Title>
            </Group>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '1rem'}}>
              <Stack align='center' style={{gap: '0rem'}}>
                <Text size='xs' style={{color: colors.success}}>
                  Record
                </Text>
                <Text size='md'>
                  {item.wins}-{item.losses}
                </Text>
              </Stack>
              <Stack align='center' style={{gap: '0rem'}}>
                <Text size='xs' style={{color: colors.success}}>
                  Points
                </Text>
                <Text size='md'>
                  {Number(item.points.toFixed(1)).toLocaleString()}
                </Text>
              </Stack>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Grid.Col>
  )
}

export default Podium