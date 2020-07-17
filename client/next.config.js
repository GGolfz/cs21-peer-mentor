
const withPWA = require('next-pwa')
 
module.exports = withPWA({
    pwa: {
        dest: 'public'
    },
    env: {
        SERVER_URL: 'http://localhost:3050',
        SOCKET_URL: 'http://localhost:5000'
    }
})