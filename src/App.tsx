import './App.css'
import { AppContainer, useDeviceSize } from '@snoconedev/mantine-ui'
import { Route, Routes, useRoutes } from 'react-router-dom'
import HomePage from './features/home/HomePage'
import NotFoundPage from './features/notFound/NotFoundPage'
import NavList from './features/navList/NavList'
import LoadPlayersPage from './features/admin/loadPlayers/LoadPlayersPage'
import LeagueHistoryPage from './features/leagueHistory/LeagueHistoryPage'

function App() {
  const { deviceSize } = useDeviceSize();
  return (
    <AppContainer
      animateRoutes
      appName='GolfBoys Football League'
      closeAfterRoute
      displayThemeToggle
      navbarContent={<NavList />}
    >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin/load-players' element={<LoadPlayersPage />} />
        <Route path='/league-history/:name' element={<LeagueHistoryPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </AppContainer>
  )
}

export default App
