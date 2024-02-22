const fs = require('fs');

function tail(print, args){
    let [ path ] = args;
    fs.readFile(path, 'utf-8', (err, data)=>{
        if (err) throw err;
        //nos da una arreglo de lineas, regresame la primera linea
        let lines = data.split('\n');
        print(lines[lines.length - 1].trim());
    });
}

module.exports = tail;