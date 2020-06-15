import fs from 'fs';
import glob from 'glob';


function getGlob(pattern) {
  return glob.sync(pattern);
}

function readFile(fileName) {
  return fs.readFileSync(fileName, 'utf8');
}

function makeSchema(fileNames) {
  return fileNames.map(readFile);
}

function loadGqlFiles(pattern) {
  let schemaFile = null;
  try {
    const files = getGlob(pattern);
    schemaFile = makeSchema(files);
    return schemaFile;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error', err);
  }
  return schemaFile;
}

export default loadGqlFiles;
