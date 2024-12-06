interface Config {
    API_URL: string;
}
let config: Config
const c = useRuntimeConfig()
if (c.public.environment === 'development') {
    config = {
        API_URL: 'http://localhost:6101',
    }
} else if (c.public.environment === 'test') {
    config = {
        API_URL: 'https://api-test.lookup-dns.com'
    }
} else {
    config = {
        API_URL: 'https://api.lookup-dns.com'
    }
}

export default config;