const fs = require('fs');

function head(print, args){
    let [ path ] = args;
    fs.readFile(path, 'utf-8', (err, data)=>{
        if (err) throw err;
        //nos da una arreglo de lineas, regresame la primera linea
        print(data.split('\n')[0]);
    });
}

module.exports = head;