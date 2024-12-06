interface Config {
    API_URL: string;
}

const config: Config = (() => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                API_URL: 'http://localhost:6101',
            }
        case 'test':
            return {
                API_URL: 'https://api-test.lookup-dns.com'
            }
        default:
            return {
                API_URL: 'https://api.lookup-dns.com'
            }
    }
})()

export default config;