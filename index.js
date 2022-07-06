let fs = require('fs'),
path = require('path')

function read(root) {

    let files = fs.readdirSync(root)

    for(let i = 0; i < files.length; i ++) {
        let name = [root, files[i]].join('\\')
        name = path.normalize(name)
        let stat = fs.statSync(name)

        if (stat.isDirectory()) {
            const obj = {}
            let fileCounter = 0
            let dirCounter = 0
           let current = fs.readdirSync(name)
            for(let j = 0; j < current.length; j ++) {
                let currentName = [name, current[j]].join('\\')
                currentName = path.normalize(currentName)
                let currentStat = fs.statSync(currentName)
                if (currentStat.isFile()){
                    fileCounter++
                }
                if (currentStat.isDirectory()){
                    dirCounter++
                }
            }
            Object.assign(obj, {path: name})
            Object.assign(obj, {files: fileCounter})
            Object.assign(obj, {directories: dirCounter})
            let json = JSON.stringify(obj)
            fs.writeFile(name + '\\info.json', json, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('success')
                }
            })
            read(name)
        }
    }
}

read(__dirname)
