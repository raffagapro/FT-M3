function echo(print, args){
    if (typeof args !== 'string') args = args.join(' ');
    print(args);
}

module.exports = echo;