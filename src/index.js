import parse from './parsers.js';
import { getFormat, readFile } from './utils.js';
import buildTree from './buildTree.js';
import diff from './formatter/index.js';

// eslint-disable-next-line no-unused-vars
const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);

  const obj1 = parse(file1, getFormat(filePath1));
  const obj2 = parse(file2, getFormat(filePath2));

  const tree = buildTree(obj1, obj2);

  console.log(JSON.stringify(diff(tree)));
  return diff(tree);
};
export default genDiff;
