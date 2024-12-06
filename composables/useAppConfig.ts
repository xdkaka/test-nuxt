import { useRuntimeConfig } from '#app'

export const useAppConfig = () => {
  const config = useRuntimeConfig()
  
  let API_URL = 'http://localhost:6101'
  
  if (config.public.environment === 'development') {
    API_URL = 'http://localhost:6101'
  } else if (config.public.environment === 'test') {
    API_URL = 'https://api-test.lookup-dns.com'
  } else {
    API_URL = 'https://api.lookup-dns.com'
  }

  return {
    API_URL
  }
} 