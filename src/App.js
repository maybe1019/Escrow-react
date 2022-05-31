import MainLayout from './layouts/MainLayout';
import { ScopedCssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Escrow from './pages/Escrow';
import { SnackbarProvider } from 'notistack';

import './assets/styles/styles.scss'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fca120',
      contrastText: "#fff" 
    },
    secondary: {
      main: '#001d4a'
    }
  }
})

function App() {
  return (
    <SnackbarProvider maxSnack={4}>
      <ThemeProvider theme={theme} >
        <ScopedCssBaseline style={{backgroundColor: "rgba(0, 0, 0, 0)"}}>
          <MainLayout>
            <Escrow />
          </MainLayout>
        </ScopedCssBaseline>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;