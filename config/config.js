let env = process.env.NODE_ENV || 'development'
if (env === 'development' || env === 'staging' || env === 'production') {
    logger.info('server config loaded');
    logger.info("env: ", env);
    const config = require('./config.json');
    global.config = config[env]
}