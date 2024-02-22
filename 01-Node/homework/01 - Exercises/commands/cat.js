const fs = require('fs');

function cat(print, args){
    //args es la ruta y nombre
    let [ path ] = args;
    fs.readFile(path, 'utf-8', (err, data)=>{
        if (err) throw err;
        print(data);
    });
}

module.exports = cat;