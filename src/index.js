import parse from './parsers.js';
import { getFormat, readFile } from './utils.js';
import buildTree from './buildTree.js';
import diff from './formatter/stylish.js';
import _ from 'lodash';

const stringify = (value, replacer = ' ' , spacesCount = 1) =>{
  const iter = (nodeValue,depth) =>{
  if(!(_.isObject(nodeValue))){
    return `${nodeValue}`;
    };
    const intendantSize = spacesCount * depth;
    const currentIntendant = replacer.repeat(intendantSize);
    const bracketsIntendant = replacer.repeat(intendantSize - spacesCount); 
    const lines = Object.entries(nodeValue).map(([key,val]) => `${currentIntendant}${key}: ${iter(val,depth + 1)}`);
    const result = ['{' ,...lines, `${bracketsIntendant}}`,].join('\n');
    return result;
  }
    return iter(value,1);
  }
// eslint-disable-next-line no-unused-vars
const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);

  const obj1 = parse(file1, getFormat(filePath1));
  const obj2 = parse(file2, getFormat(filePath2));

  const tree = buildTree(obj1, obj2);

  console.log(stringify(diff(tree), ' ' , 4));
  return diff(tree);
};
export default genDiff;