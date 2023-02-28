import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

import { useLogin } from '@Mutation/login'
import { loginSchema, LoginData } from '@Type/login'

export const Login = () => {
  const { t } = useTranslation('app', { keyPrefix: 'login' })

  const { control, handleSubmit, watch } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })
  const mutation = useLogin()

  const onSubmit = (data: LoginData) => {
    console.log(data)
    mutation.mutate(data)
  }

  watch(() => mutation.reset())

  return (
    <Card sx={{ minWidth: 250 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Typography variant="h5" component="div">
            {t('title')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 2,
              gap: 1,
            }}
          >
            <TextFieldElement
              name={'username'}
              label={t('username')}
              control={control}
            />
            <PasswordElement
              name={'password'}
              label={t('password')}
              control={control}
            />
            {mutation.isSuccess && (
              <Alert security="success">{t('success')}</Alert>
            )}
          </Box>
        </CardContent>
        <CardActions>
          <Button type={'submit'} color={'primary'}>
            {t('submit')}
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
