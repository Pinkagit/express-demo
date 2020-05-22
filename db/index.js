const mongoose = require('mongoose');
const MongoConf = global.config.MONGO
const fs = require('fs')

let MongOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    auto_reconnect: true,
    poolSize: 10,
}
Object.assign(MongOptions, MongoConf.mongoOptions)

logger.info("MongUrl ===>", MongoConf.url)
logger.info("MongOptions =====>", MongOptions)

mongoose.connect(`mongodb://${MongoConf.url}`, MongOptions)

let db = mongoose.connection;
// 使用 Node 自带 Promise 代替 mongoose 的 Promise
mongoose.Promise = global.Promise;

db.on('error', (err) => {
    logger.error('/------------------------');
    logger.error('数据库db连接错误！');
    logger.error(err);
    logger.error('-------------------------/');
})

db.on('open', (rep) => {
   logger.info('/-----------------------')
   logger.info("数据库db连接成功！")
   logger.info('------------------------/');
})

module.exports = mongoose