import { Group, Loader, MantineNumberSize, Stack, Text } from '@mantine/core'
import React from 'react'

type Props = {
  containerStyle?: React.CSSProperties;
  message?: React.ReactNode;
  size: MantineNumberSize;
}

const PageLoader = (props: Props) => {
  return (
    <Stack align='center' style={props.containerStyle}>
      <Group position='center'>
        <Loader variant='dots' size={props.size} color='teal.5' />
      </Group>
      {props.message && (
        <Group position='center'>
          {typeof props.message === 'string' && (
            <Text align='center'>
              {props.message}
            </Text>
          )}
          {typeof props.message !== 'string' && (
            <>
            {props.message}
            </>
          )}
        </Group>
      )}
    </Stack>
  )
}

export default PageLoader