interface Config {
    API_URL: string;
}

let config: Config
// const c = useRuntimeConfig()
console.log("process.env.NODE_ENV", process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    config = {
        API_URL: 'http://localhost:6101',
    }
} else if (process.env.NODE_ENV === 'test') {
    config = {
        API_URL: 'https://api-test.lookup-dns.com'
    }
} else {
    config = {
        API_URL: 'https://api.lookup-dns.com'
    }
}

export default config;