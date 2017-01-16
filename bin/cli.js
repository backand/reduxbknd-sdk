#!/usr/bin/env node

var program   = require('commander');
var path      = require('path');
var join      = path.join;
var fs        = require('fs-extra')
var generator = require('./../src/generator/generator');
var chalk     = require('chalk');
var success   = chalk.bold.green;
var warn      = chalk.bold.yellow;
var error     = chalk.bold.red;

program
  .version(require('../package.json').version)
  .usage('obj1[ obj2[ obj3[ ...]]] [options]')
  .option('-d, --dir [path]', 'specify the directory to save the generated files [process.cwd()]', process.cwd())
  .option('-o, --override', 'override objects if already exists in directory [false]')
  .option('-m, --middleware [middleware]', 'the redux middleware to generate for (thunk/saga) [thunk]', /^(thunk|saga)$/i, 'thunk')

program._name = 'reduxbknd'
program.parse(process.argv);

if (program.dir !== process.cwd()) {
  try {
    process.chdir(program.dir);
    console.log(success(`switched to: ${process.cwd()}`));
  }
  catch (err) {
    console.log(error(`chdir: ${err}`));
  }
}

var objects = program.args;
if (!objects.length) {
  program.help();
}
else {
  if (objects.indexOf('user') !== -1) {
    console.log(warn('USER is a unique object. it\'s copy will be transferred to the requested folder'));
    try {
      fs.copySync(join(__dirname, `../src/userActions/userActions_${program.middleware}.js`), join(__dirname, `../src/user/userActions.js`), {clobber: true});
      fs.copySync(join(__dirname, '../src/user'), `${process.cwd()}/user`, {clobber: program.override});
      fs.unlinkSync(join(__dirname, `../src/user/userActions.js`));
      console.log(success(`Object USER has been created`));
    }
    catch (err) {
      console.log(error(`Object USER already exists`));
    }
    objects.splice(objects.indexOf('user'), 1);
  }
  generator(objects, program.override, program.middleware)
}
