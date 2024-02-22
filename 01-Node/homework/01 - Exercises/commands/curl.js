const { request } = require("../utils/request");

function curl(print, args){
    request(args, (err, res)=>{
        if (err) throw err;
        print(res);
    });
}

module.exports = curl;