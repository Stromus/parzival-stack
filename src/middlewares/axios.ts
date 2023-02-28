import axios from 'axios'
export { AxiosError } from 'axios'

export default axios.create({
  transformRequest: [
    (data, headers) => {
      return JSON.stringify(data, (key, value) =>
        typeof value === 'undefined' ? null : value
      )
    },
  ],
  headers: {
    common: {
      Accept: 'application/ld+json',
    },
    post: {
      'Content-Type': 'application/json',
    },
    put: {
      'Content-Type': 'application/json',
    },
  },
})
