let baseurl = ""

if (process.env.NODE_ENV === 'development') {
    baseurl = 'http://localhost:8000'

} else {
    baseurl = 'https://xxx'
}

export default baseurl