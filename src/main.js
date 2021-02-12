const fs = require('fs-extra');
const path = require('path');

const _ = require('lodash');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

const parseDataArgs = (args) => {
  const data = {};
  for (const arg of args) {
    const parts = arg.split('=');
    if (parts.length == 2) {
      data[parts[0]] = parts[1];
    }
  }
  return data;
};

const create = async (template, destination, data) => {
  const doesTemplateExist = await fs.pathExists(template);
  if (!doesTemplateExist) {
    console.error('Folder doesnt exist', template);
    return;
  }

  const filenames = await fs.readdir(template);
  for (const filename of filenames) {
    templateFilePath = path.join(template, filename);
    destinationFilePath = path.join(destination, filename);
    const destinationFilename = _.template(destinationFilePath)(data);

    console.log('Creating : ', destinationFilename);
    const stat = await fs.stat(templateFilePath);
    if (stat.isDirectory()) {
      await fs.ensureDir(destinationFilename);
      await create(templateFilePath, destinationFilePath, data);
    } else if (stat.isFile()) {
      const content = await (await fs.readFile(templateFilePath)).toString();
      const newContent = _.template(content)(data);
      fs.writeFile(destinationFilename, newContent);
    }
  }
};

exports.start = async (template, destination, args) => {
  await create(template, destination, parseDataArgs(args));
  console.log('Done');
};
