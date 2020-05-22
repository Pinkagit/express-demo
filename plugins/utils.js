const fs = require('fs')

const checkEmail = email => {
	// 验证邮箱格式是否正确
	const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	return reg.test(email)
}

const checkTelPhone = telphone => {
	// 验证手机格式是否正确
	const reg = /^\d{11}$/
	if (reg.test(telphone) && telphone.substring(0, 3) === '010') {
		return true
	} else {
		return false
	}
}

const imgToBase64 = imgUrl => {
	let bitmap = fs.readFileSync(imgUrl)
	return Buffer.from(bitmap, 'binary').toString('base64')
}

// 删除文件
const delFile = p => {
	return new Promise((resolve, reject) => {
		fs.unlink(p, function(err) {
			if (err) {
				reject(err)
            }
            logger.info(`[${p}]删除文件成功！`)
			resolve()
		})
	})
}

// 删除文件夹及所有文件
const deleteFolder = filePath => {
	const files = []
	if (fs.existsSync(filePath)) {
		const files = fs.readdirSync(filePath)
		files.forEach(file => {
			const nextFilePath = `${filePath}/${file}`
			const states = fs.statSync(nextFilePath)
			if (states.isDirectory()) {
				//recurse
				deleteFolder(nextFilePath)
			} else {
				//delete file
				fs.unlinkSync(nextFilePath)
			}
		})
		fs.rmdirSync(filePath)
	} else {
        logger.warn(`${filePath} 路径不存在`)
    }
}

// 创建文件夹
const mkdir = (dirPath) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdir(dirPath, (err) => {
                if(err) {
                    reject(err)
                }
                logger.info(`${dirPath} 文件夹创建成功`)
                resolve()
            })
        } else {
            reject(`${dirPath} 文件夹已经存在`)
        }
    })
}

/**
 * @description: 移动文件
 * @param {String} filePath 原文件路径
 * @param {String}  targetFile 目标路径
 */
const rename = (filePath, targetFile) => {
    return new Promise((resolve, reject) => {
        fs.rename(filePath, targetFile, (err) => {
            if(err) {
                reject(err)
            } else {
                logger.info(`${filePath} 文件移动成功`)
                resolve()
            }
        })
    })
}

/**
 * @description: 获取文件大小
 * @param {String} filePath 文件路径
 * @return: size bit
 */
const getFileSize = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stat) => {
            if(err) {
                reject(err)
            }
            resolve(stat.size)
        })
    })
}

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
    .catch(next);
}

module.exports = {
	checkEmail,
	checkTelPhone,
	imgToBase64,
    delFile,
    mkdir,
    deleteFolder,
    rename,
    getFileSize,
    asyncMiddleware
}