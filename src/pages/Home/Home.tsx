import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { DataGrid, frFR, enUS } from '@mui/x-data-grid'

import { useQueryGetUsers } from '@Query/user'
import { useTranslation } from 'react-i18next'

export const Home = () => {
  const { data: users } = useQueryGetUsers()
  const { t, i18n } = useTranslation('app', { keyPrefix: 'home' })

  const columns = [
    { field: 'id', headerName: t('table.id'), width: 90 },
    {
      field: 'name',
      headerName: t('table.name'),
      width: 200,
    },
    {
      field: 'username',
      headerName: t('table.username'),
      width: 200,
    },
    {
      field: 'email',
      headerName: t('table.email'),
      width: 300,
    },
  ]

  return (
    <>
      <Card sx={{ minWidth: 250 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {t('title')}
          </Typography>
          <Typography variant="body2">{t('subTitle')}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{t('start')}</Button>
        </CardActions>
      </Card>
      {users && (
        <Box sx={{ height: 400, width: '100%', marginTop: 8 }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            localeText={
              (i18n.language === 'en' ? enUS : frFR).components.MuiDataGrid
                .defaultProps.localeText
            }
          />
        </Box>
      )}
    </>
  )
}
