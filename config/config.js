let env = process.env.NODE_ENV || 'development'
if (env === 'development' || env === 'staging' || env === 'production') {
    console.log('server config loaded');
    console.log("env: ", env);
    const config = require('./config.json');
    global.config = config[env]
}