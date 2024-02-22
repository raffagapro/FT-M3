const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');

function bash(){
   process.stdout.write('prompt > ');
   process.stdin.on('data', (data)=>{
      let [ cmd, ...args ] = data.toString().trim().split(' ');
      //['print', 4, true, 'batman', {password:'123'}] arg
      //el primer elemento se guarda en la var cmd
      //el resto en la variable arg
      commands.hasOwnProperty(cmd) ? commands[cmd](print, args) : print(`command not found: ${cmd}`);
   });
}

function print(output){
   process.stdout.write(output);
   process.stdout.write('\nprompt > ');
}

bash();
module.exports = {
   print,
   bash,
};