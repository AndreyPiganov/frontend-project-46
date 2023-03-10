import parse from './parsers.js';
import _ from  'lodash';
import { getFormat, readFile } from './utils.js';
import buildTree from './buildTree.js';

// eslint-disable-next-line no-unused-vars
const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);

  const obj1 = parse(file1, getFormat(filePath1));
  const obj2 = parse(file2, getFormat(filePath2));

  const tree = buildTree(obj1, obj2);
  const testCase = (tree) => {
  const result = tree.flatMap((node) => {
    switch(node.status){
      case 'deleted':
        node[`- ${node['key']}`] = node['value'];
        break;
      case 'added':
        node[`+ ${node['key']}`] = node['value'];
        break;
      case 'nested':
        node[node['key']] = testCase(node['value']);
        break;
      case 'unchanged':
        node[node['key']] = node['value'];
        break;
      default:
        node[`- ${node['key']}`] = node['value1'];
        node[`+ ${node['key']}`] = node['value2'];
        break;
    }
    return _.omit(node, ['key' , 'value' , 'status', 'value1', 'value2']);
  })
  return result;
}
console.log(JSON.stringify(testCase(tree)))
  return testCase(tree);
};
export default genDiff;
