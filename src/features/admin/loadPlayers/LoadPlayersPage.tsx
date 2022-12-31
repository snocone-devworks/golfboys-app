import { Divider, Stack, Title } from '@mantine/core'
import { ThemedButton, useNotify } from '@snoconedev/mantine-ui'
import React, { useState } from 'react'
import { api } from '../../../api'
import { defaultStats } from '../../../types/PlayerStats'
import { CSVLink } from 'react-csv';
import { defaultPlayerInfo } from '../../../types/PlayerInfo'

// const LoadPlayersPage = () => {
//   const notify = useNotify();
//   const [csvData, setCsvData] = useState<any[]>([]);
//   const [csvHeaders, setCsvHeaders] = useState<any[]>([]);
//   const distinctPropsFromArray = (value: any[]): void => {
//     let keys: string[] = [];

//     value.forEach(p => {
//       if (typeof p === 'object' && !Array.isArray(p)) {
//         Object.keys(p).forEach(k => {
//           if (!keys.includes(k)) keys.push(k);
//         })
//       }
//     });

//     keys.sort();

//     console.log(keys);
//   }

//   const distinctPropsForStats = (value: any) => {
//     let keys: string[] = [];

//     Object.entries(value).forEach(([key, value]) => {
//       if (typeof value === 'object') {
//         Object.keys(value as Object).forEach(key => {
//           if (!keys.includes(key)) keys.push(key);
//         });  
//       }
//     });

//     keys.sort();
//     let returnObject: any = {

//     };

//     keys.forEach(key => {
//       returnObject[key] = "number | null | undefined";
//     });

//     console.log(returnObject);
//   }

//   const getPlayers = async () => {
//     let players = await api.players();

//     if (players.length === 0) return;

//     let data: any = [];
//     let headerRow: any = [];
//     Object.keys(defaultPlayerInfo).forEach(key => headerRow.push(key));
//     players.filter(p => p.player_id).forEach(player => data.push({...player, id: player.player_id}));
    
//     setCsvData(data);
//     setCsvHeaders(headerRow);
//     if (notify) notify('success', 'Players data set');
//   }

//   const getStats = async () => {
//     let stats = await api.stats(2022, 10);

//     if (stats.length === 0) return;

//     let data: any = [];
//     let headerRow: any = [];
//     Object.keys(defaultStats).forEach(key => headerRow.push(key))
//     stats.forEach((stat, index) => data.push({...stat, id: index + 1, year: 2022, week: 10}));

//     setCsvData(data);
//     setCsvHeaders(headerRow);
//     if (notify) notify('success', 'Stats data set');
//   }

//   return (
//     <Stack>
//       <Title order={3}>
//         Leagues
//       </Title>
//       <Divider />
//       <ThemedButton
//         color='info'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.leagueDrafts(2022).then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get League Drafts
//       </ThemedButton>    
//       <ThemedButton
//         color='info'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.leagueDraftPicks("809267835644776449").then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get League Draft Picks
//       </ThemedButton>          
//       <ThemedButton
//         color='info'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.leagueInfo(2020).then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get League Info
//       </ThemedButton>
//       <ThemedButton
//         color='info'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.leagueMatchups(2022, 10).then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get League Matchups
//       </ThemedButton>          
//       <ThemedButton
//         color='info'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.leagueRosters(2022).then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get League Rosters
//       </ThemedButton>    
//       <ThemedButton
//         color='info'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.leagueTransactions(2022, 9).then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get League Transactions
//       </ThemedButton>         
//       <ThemedButton
//         color='info'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.leagueManagers(2022).then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get League Users
//       </ThemedButton>  



//       <Title order={3} style={{marginTop: '1rem'}}>
//         Players
//       </Title>
//       <Divider />
//       <ThemedButton
//         color='primary'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => getPlayers()}
//       >
//         Get Players
//       </ThemedButton>   
//       <CSVLink data={csvData} filename={'players.csv'} headers={csvHeaders} separator={';'}>
//         Download players
//       </CSVLink>

//       <Title order={3} style={{marginTop: '1rem'}}>
//         Stats
//       </Title>
//       <Divider />
//       <ThemedButton
//         color='primary'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => getStats()}
//       >
//         Get Stats
//       </ThemedButton>   
//       <CSVLink data={csvData} filename='stats.csv' headers={csvHeaders} separator={';'}>
//         Download stats
//       </CSVLink>



//       <Title order={3} style={{marginTop: '1rem'}}>
//         Users
//       </Title>
//       <Divider />
//       <ThemedButton
//         color='error'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.userById("421353405504552960").then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get User By ID
//       </ThemedButton>    
//       <ThemedButton
//         color='error'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.userByName("JeremyHayworth").then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get User By Name
//       </ThemedButton>    
//       <ThemedButton
//         color='error'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.userDrafts("421353405504552960", 2022).then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get User Drafts
//       </ThemedButton>                
//       <ThemedButton
//         color='error'
//         style={{ width: 'fit-content', marginLeft: '1rem' }}
//         onClick={() => api.userLeagues("421353405504552960", 2022).then(r => console.log(r)).catch(e => console.log(e))}
//       >
//         Get User Leagues
//       </ThemedButton>         
//     </Stack>
//   )
// }

const LoadPlayersPage = () => {
  return (
    <div>LoadPlayersPage</div>
  )
}

export default LoadPlayersPage