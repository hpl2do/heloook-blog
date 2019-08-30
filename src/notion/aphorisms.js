const { queryCollection } = require('./api')
const fs = require("fs")
const path = require("path")

syncAphorisms = async () => {
    let res = await queryCollection('https://www.notion.so/heloook/f38854123bac4aebb2955195c9317fcb?v=d2f3e81650284812a59defdfa282e661')
    let data = JSON.stringify(res)

    let rootPath = path.dirname(path.dirname(__dirname))
    let dataPath = `${rootPath}/public/static/aphorisms.json`

    fs.writeFile(dataPath, data, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log("格言保存成功")
        }
    })
}

// syncAphorisms()

module.exports = { syncAphorisms }
