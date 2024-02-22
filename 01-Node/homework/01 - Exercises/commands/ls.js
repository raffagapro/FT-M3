const fs = require('fs');

function ls(print){
    fs.readdir('.', (err, files)=>{
        if (err) throw err;
        print(files.join(' '));
    });
}

module.exports = ls;