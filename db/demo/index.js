const methods = require("../methods.js")
const Demo = require("./model").Demo

exports.save = (ctx) => {
    return new Promise((resolve, reject) => {
        methods.save(Demo, ctx).then(rep => {
            resolve(rep)
        }).catch(e => {
            reject(e)
        })
    })
}

exports.updateOne = (filter, ctx) => {
    return new Promise((resolve, reject) => {
        methods.updateOne(Demo, filter, ctx).then(rep => {
            resolve(rep)
        }).catch(e => {
            reject(e)
        })
    })
}

exports.findOneAndUpdate = (filter, ctx) => {
    return new Promise((resolve, reject) => {
        methods.findOneAndUpdate(Demo, filter, ctx, false).then(rep => {
            resolve(rep)
        }).catch(e => {
            reject(e)
        })
    })
}

exports.deleteOne = (filter) => {
    return new Promise((resolve, reject) => {
        methods.deleteOne(Demo, filter).then(rep => {
            resolve(rep)
        }).catch(e => {
            reject(e)
        })
    })
}

exports.deleteMany = (filter) => {
    return new Promise((resolve, reject) => {
        methods.deleteMany(Demo, filter).then(rep => {
            resolve(rep)
        }).catch(e => {
            reject(e)
        })
    })
}

exports.find = (filter, field, sorter) => {
    return new Promise((resolve, reject) => {
        methods.find(Demo, filter, field, sorter).then(rep => {
            resolve(rep)
        }).catch(e => {
            reject(e)
        })
    })
}

exports.findPaging = (filter, field, sorter, skip_num, limit_num) => {
    return new Promise((resolve, reject) => {
        methods.findPaging(Demo, filter, field, sorter, skip_num, limit_num).then(rep => {
            resolve(rep)
        }).catch(e => {
            reject(e)
        })
    })
}