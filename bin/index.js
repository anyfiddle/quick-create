#!/usr/bin/env node

const yargs = require('yargs');
const { start } = require('../src/main');

const options = yargs
  .usage('Usage: - <t> - <n>')
  .option('t', {
    alias: 'template',
    describe: 'template folder or file',
    type: 'string',
    default: './.template',
  })
  .option('d', {
    alias: 'destination',
    describe: 'Folder to create the new files. Default to current folder',
    type: 'string',
    default: './',
  })
  .option('a', {
    alias: 'args',
    describe: 'Data args used to compute output from tempalates. name=John',
    type: 'array',
    default: '',
  }).argv;

const { template, destination, args } = options;
start(template, destination, args);
