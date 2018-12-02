// dev-server-config
const path = require('path');
module.exports = {
    devServer: {
        contentBase:path.join(__dirname,'static','pic'),
        port:9000,
        historyApiFallback:true,
        hot:true,
        open:true,
        proxy: {
            '/api': 'http://localhost:8080'
        }
    }
}