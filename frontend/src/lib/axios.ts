import axios, { AxiosResponse } from 'axios'
import { getAuthCrendentialsFromLocal } from '../components/utils'

export const DEFAULT_MESSAGE = {
  SUCCESS: 'Action taken',
  ERROR_000: 'Check your internet connection',
  ERROR_400: 'The request could not be interpreted. Check the syntax of the information sent',
  ERROR_401: 'You need to log in',
  ERROR_403: 'Access denied. This access profile does not allow the desired action',
  ERROR_404: 'The requested resource was not found',
  ERROR_422: 'Request contains invalid fields',
  ERROR_429: 'Access attempt limit has been reached',
  ERROR_500: 'An unexpected error has occurred. Contact support if the problem persists'
}

const handleSuccess = (response: AxiosResponse, MESSAGE = DEFAULT_MESSAGE.SUCCESS) => {
  const { data: res } = response

  const noDataObject = !res.data && res.success ? null : res
  const data = {
    ...res.data || noDataObject,
    message: res.message || MESSAGE,
    success: res.success
  }
  return {...response,  data}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (err: any, MESSAGE = DEFAULT_MESSAGE.ERROR_000) => {
  if (err.response) {
    // Unknow Error / Server Error
    const status = err?.response?.status

    if (!status) {
      return {data: {success: false, message: MESSAGE}}
    } // eslint-disable-line
    // The request was made and the server responded with a status code
    else if (err.response.data) {
      const { data } = err.response

      if (data && data?.message) {
        const { message } = data
        return {data: {success: false, message: message}}
      } else {
        if (status === 400) { return {success: false, message: DEFAULT_MESSAGE.ERROR_400} }
        if (status === 401) { return {success: false, message: DEFAULT_MESSAGE.ERROR_401} }
        if (status === 403) { return {success: false, message: DEFAULT_MESSAGE.ERROR_403} }
        if (status === 404) { return {success: false, message: DEFAULT_MESSAGE.ERROR_404} }
        if (status === 422) { return {success: false, message: DEFAULT_MESSAGE.ERROR_422} }
        if (status === 429) { return {success: false, message: DEFAULT_MESSAGE.ERROR_429} }
        if (status === 500) { return {success: false, message: DEFAULT_MESSAGE.ERROR_500} }
      }
    }
  }

  return {data: {success: false, message: MESSAGE}}
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(config => {
    const auth =  getAuthCrendentialsFromLocal()
    if (auth) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }

  return config;
});

api.interceptors.response.use(handleSuccess, handleError);

export { api }
