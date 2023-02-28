import React from 'react'
import ReactDOM from 'react-dom/client'
import { SnackbarProvider } from 'notistack'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import App from './App'

import '@Middleware/i18n'
import '@Middleware/datadog'
import { theme } from '@Middleware/mui'
import { queryClient } from '@Middleware/queryClient'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SnackbarProvider autoHideDuration={5000}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </LocalizationProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SnackbarProvider>
  </React.StrictMode>
)
