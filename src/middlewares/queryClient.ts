import { enqueueSnackbar } from 'notistack'
import { t } from 'i18next'
import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      onError: err => {
        console.error(err)
        enqueueSnackbar(t('common:error.fetch'), {
          variant: 'error',
        })
      },
    },
  },
})
