const fs = require('fs');

function writeHistory(stat){
    // let content = JSON.parse(stat);
    fs.writeFile('/../db/stats.json', stat, (err) => {
        if (err) {
            console.error(err)
            return
        }
        //файл записан успешно
    })
}

export default writeHistory;