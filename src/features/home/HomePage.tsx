import { Title, useMantineTheme } from '@mantine/core'
import { useThemeColors } from '@snoconedev/mantine-ui'
import React from 'react'
import Logo from './Logo';

const HomePage = () => {
  const colors = useThemeColors();

  return (
    <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 auto', justifyContent: 'flex-start', alignItems: 'center'}}>
      <Logo />
    </div>

  )
}

export default HomePage