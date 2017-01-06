var path    = require('path');
var join    = path.join;
var fs      = require('fs-extra');
var os      = require('os');
var exists  = fs.existsSync;
var chalk   = require('chalk');
var success = chalk.bold.green;
var warn    = chalk.bold.yellow;
var error   = chalk.bold.red;

module.exports = function (objects, override, middleware) {
  objects.forEach(obj => {
    var types_gen   = require('./types_gen');
    var reducer_gen = require('./reducer_gen');
    var actions_gen = require(`./actions_gen_${middleware}`);

    var dir     = `${obj}`;
    var types   = `${dir}/${obj}Types.js`;
    var reducer = `${dir}/${obj}Reducer.js`;
    var actions = `${dir}/${obj}Actions.js`;

    if (!override && exists(dir)) {
      console.log(error(`Object ${obj} already exists`));
    }
    else {
      if (!exists(dir)) fs.mkdirSync(dir);
      fs.writeFileSync(types, types_gen(obj));
      fs.writeFileSync(reducer, reducer_gen(obj));
      fs.writeFileSync(actions, actions_gen(obj));
      if (middleware === 'saga' && !exists('sagas.js')) {
        fs.copySync(join(__dirname, 'sagas.js'), 'sagas.js');
      }
      console.log(success(`Object ${obj.toUpperCase()} has been created`));
    }
  });
}
