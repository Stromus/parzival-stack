import { datadogRum } from '@datadog/browser-rum'
import { datadogLogs } from '@datadog/browser-logs'

if (import.meta.env.PROD) {
  const options = {
    clientToken: 'TOKEN',
    site: 'datadoghq.eu',
    service: 'parzival-stack',
    env: 'recette',
    sampleRate: 100,
    trackSessionAcrossSubdomains: true,
    useSecureSessionCookie: true,
  }

  datadogRum.init({
    ...options,
    applicationId: 'APP_ID',
    trackInteractions: true,
    allowedTracingOrigins: [
      window.location.protocol + '//' + window.location.hostname,
    ],
  })

  datadogLogs.init({
    ...options,
    forwardErrorsToLogs: true,
  })
}
