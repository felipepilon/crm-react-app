import React, { useContext } from 'react';
import AppRouter from './AppRouter';
import { Box } from '@material-ui/core';
import FullPageLoader from './components/FullPageLoader';
import { AppStateContext } from './contexts/AppState';

function App() {
  const { status } = useContext(AppStateContext);

  return (
    <Box
      minHeight='100vh'
      height='100vh'
    >
      {
        status !== 'initiating' && <AppRouter/>
      }
      <FullPageLoader/>
    </Box>
  )
}

export default App;
