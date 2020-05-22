/**
 * @description: 新增实例化模型数据
 * @param {Object} model 模型
 * @param {Object} ctx 模型数据
 * @return: 新增数据
 */
exports.save = (model, ctx) => {
    return new Promise((resolve, reject) => {
        let Model = new model(ctx)
        Model.save((err, rep) => {
            if (err) {
                reject(err)
            }
            resolve(rep)
        })
    })
}

/**
 * @description: 查询多条数据
 * @param {Object} model 数据模型
 * @param {Object} filter 查询条件
 * @param {Object} field 查询字段
 * @param {Object} sorter 排序
 * @return: {Array} 符合条件数据
 */
exports.find = (model, filter={}, field={}, sorter={}) => {
    return new Promise((resolve, reject) => {
        model.find(filter, field)
        .sort(sorter)
        .exec((err, rep) => {
            if (err) {
                reject(err)
            }
            resolve(rep)
        })
    })
}

/**
 * @description: 分页查询
 * @param {Object} model 数据模型
 * @param {String} filter 查询条件
 * @param {String} sorter 排序
 * @param {String} skip_num 查询跳过数据量
 * @param {String} limit_num 查询返回数据量
 * @return: {Array} [符合条件数据总数, 符合条件数据]
 */
exports.findPaging = async(model, filter={}, field={}, sorter={}, skip_num=0, limit_num=0) => {
    return await Promise.all([
        model.find(filter).countDocuments(),
        model.find(filter, field)
        .sort(sorter)
        .skip(skip_num)
        .limit(limit_num)
    ])
}

/**
 * @description: 删除符合条件的第一条数据
 * @param {Object} model 数据模型
 * @param {Object} filter 查询条件，不填默认删除第一条数据
 * @return: 删除后后影响数据量
 */
exports.deleteOne = (model, filter) => {
    return new Promise((resolve, reject) => {
        model.deleteOne(filter).exec((err, rep) => {
            if (err) {
                reject(err)
            }
            resolve(rep)
        })
    })
}

/**
 * @description: 删除符合条件的所有数据
 * @param {Object} model 数据模型
 * @param {Object} filter 查询条件
 * @return: 删除后后影响数据量
 */
exports.deleteMany = (model, filter) => {
    return new Promise((resolve, reject) => {
        model.deleteMany(filter).exec((err, rep) => {
            if (err) {
                reject(err)
            }
            resolve(rep)
        })
    })
}

/**
 * @description:  修改某一条数据
 * @param {Object} model 数据模型
 * @param {Object} filter 筛选条件
 * @param {Object} ctx 更新字段
 * @return: 修改后影响数据量
 */
exports.updateOne = (model, filter, ctx) => {
    return new Promise((resolve, reject) => {
        model.updateOne(filter, ctx).exec((err, rep) => {
            if (err) {
                reject(err)
            }
            resolve(rep)
        })
    })
}

/**
 * @description: 修改数据
 * @param {Object} model 数据模型
 * @param {Object} filter 筛选条件
 * @param {Object} ctx 更新字段
 * @param {Boolean} upsert 是否当没有文档与匹配，则创建一个新文档，默认为false
 * @return: 修改后数据
 */
exports.findOneAndUpdate = (model, filter, ctx, upsert=false) => {
    return new Promise((resolve, reject) => {
        logger.info("upsert", upsert)
        
        model.findOneAndUpdate(filter, ctx, {
            new: true,
            upsert
        }).exec((err, rep) => {
            if (err) {
                reject(err)
            }
            resolve(rep)
        })
    })
}