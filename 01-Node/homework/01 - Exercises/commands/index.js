const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");
const pwd = require("./pwd");
const date = require('./date');
const echo = require('./echo');
const ls = require('./ls');
const cat = require('./cat');
const head = require('./head');
const tail = require('./tail');
const curl = require('./curl');

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl
};
