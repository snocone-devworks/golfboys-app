import { Avatar, Card, Group, Stack, Table as MantineTable, Title } from '@mantine/core';
import { useDeviceSize, useThemeColors } from '@snoconedev/mantine-ui';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import React, { useMemo, useState } from 'react'
import { MdEmojiEvents, MdMilitaryTech } from 'react-icons/md';
import { Standing, StandingOverall } from '../../../types/Standing';

type SortColumn = {
  prop: keyof StandingOverall;
  title: string;
}

const columns: SortColumn[] = [

];

type Props = {
  rows: StandingOverall[];
}

function OverallTable(props: Props) {
  const { deviceSize } = useDeviceSize();

  if (['xs', 'sm'].includes(deviceSize)) return (<SmallTable {...props} />)

  return (
    <LargeTable {...props} />
  )
}

function SmallTable(props: Props){
  const colors = useThemeColors();
  const [sort, setSort] = useState<string>('Win Percent');
  const [detailsColumn, setDetailsColumn] = useState<string>('');
  
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ y: '100vh', opacity: 0 }}
        animate={{y: 0, opacity: 1 }}
        exit={{ y: '-100vh', opacity: 0 }}
        transition={{ delay: 4 * 0.3, type: 'spring', bounce: 0.3, damping: 15 }}
      >
        <Card
          radius='lg'
          shadow='lg'
          style={{width: '100%'}}
        >
          <Stack>
            <Stack style={{gap: '0.2rem'}}>
              <Title>
                Results
              </Title>
            </Stack>
            <MantineTable withBorder withColumnBorders>
              <thead>
                <tr>
                  <th>Manager</th>
                  <th>Record</th>
                  <th>Points</th>
                  <th>{detailsColumn}</th>
                </tr>
              </thead>
              <tbody>
                {props.rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '0.4rem'}}>
                          <Avatar 
                            size='sm'
                            radius='lg'
                            src={`https://sleepercdn.com/avatars/${row.userAvatar}`}
                            alt={row.userName}
                          />
                          {row.userName}
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '0.4rem', flexWrap: 'wrap'}}>
                          <PlaceIcons place={1} positions={row.positionsFinal} />
                          <PlaceIcons place={2} positions={row.positionsFinal} />
                          <PlaceIcons place={3} positions={row.positionsFinal} />
                        </div>
                      </div>
                    </td>
                    <td>
                      {row.stats.wins}-{row.stats.losses} ({Number(row.winPercent * 100).toFixed(1)}%)
                    </td>
                    <td>
                      {Number(row.stats.points.toFixed(1)).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </MantineTable>
          </Stack>
        </Card>        
      </motion.div>
    </AnimatePresence>

  )
}

function LargeTable(props: Props){
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ y: '100vh', opacity: 0 }}
        animate={{y: 0, opacity: 1 }}
        exit={{ y: '-100vh', opacity: 0 }}
        transition={{ delay: 4 * 0.3, type: 'spring', bounce: 0.3, damping: 15 }}
      >
        <Card
          radius='lg'
          shadow='lg'
          style={{width: '100%'}}
        >
          <Stack>
            <Title order={2}>
              Results
            </Title>
          </Stack>
        </Card>        
      </motion.div>
    </AnimatePresence>
  )
}

type PlaceIconsProps = {
  place: number;
  positions: number[];
}


const PlaceIcons = ({ place, positions }: PlaceIconsProps) => {
  let items = useMemo(() => positions.filter(p => p === place), [positions, place]);

  if (items.length === 0) return null;
  if (![1, 2, 3].includes(place)) return null;

  return (
    <span style={{gap: '0rem'}}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {place === 1 && (
            <MdEmojiEvents size='1.2rem' color={'#cfe094'} style={{marginLeft: index > 0 ? '-0.2rem' : undefined}} />
          )}
          {place === 2 && (
            <MdMilitaryTech size='1.2rem' color={'#a0a19f'} style={{marginLeft: index > 0 ? '-0.2rem' : undefined}} />
          )}
          {place === 3 && (
            <MdMilitaryTech size='1.2rem' color={'#677348'} style={{marginLeft: index > 0 ? '-0.2rem' : undefined}} />
          )}        
        </React.Fragment>
      ))}
    </span>
  )
}

export default OverallTable