import { Routes, Route, Link } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'

import { Home } from '@Page/Home'
import { Login } from '@Page/Login'

import '@Style/App.scss'
import { useTranslation } from 'react-i18next'

function App() {
  const { t } = useTranslation()

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Parzival Stack
          </Typography>
          <Button color="inherit" component={Link} to="/">
            {t('nav.home')}
          </Button>
          <Button color="inherit" component={Link} to="/login">
            {t('nav.login')}
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Container>
    </div>
  )
}

export default App
