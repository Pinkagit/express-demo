const mongoose = require("../index.js")

let demoSchema = mongoose.Schema({
    uid: { type: String, unique: true, dropDups: true },
    name: String,
    tel: Number
}, {
    timestamps: true
})

// 添加索引
demoSchema.index({ createdAt: -1 })

module.exports = {
    Demo: mongoose.model("Demo", demoSchema)
}