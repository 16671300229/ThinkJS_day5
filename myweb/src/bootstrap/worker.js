// invoked in worker
const fs = require('fs');
const net = require('net');
const tcp = net.createServer();

think.beforeStartServer(async () => {
    const controllerDir = `${think.ROOT_PATH}/src/controller/`
    const res = fs.readdirSync(controllerDir)
    const routers = []
    let dirCount = 0
    let apiCount = 0
    for (let k in res) {
        try {
            const dirFiles = fs.readdirSync(`${controllerDir}${res[k]}`)
            if (dirFiles) {
                for (let kk in dirFiles) {
                    let file = dirFiles[kk].slice(0, -3)
                    routers.push([`/${res[k]}\/${file}/:id?`, 'rest'])
                    apiCount++
                }
                dirCount++
            }
        } catch (error) {
        }
    }
    if (think.env === 'development') {
        console.log(`[${think.datetime()}] [重载] - 已为您检测到${dirCount}个文件夹，共加载了${apiCount}个自定义接口`)
    }
})