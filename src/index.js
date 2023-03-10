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
        return _.omit(node, ['key' , 'value', 'status']);
      case 'added':
        node[`+ ${node['key']}`] = node['value'];
        return _.omit(node, ['key' , 'value' , 'status']);
      case 'nested':
        node[node['key']] = testCase(node['value']);
        return _.omit(node, ['key' , 'value' , 'status']);
      case 'unchanged':
        node[node['key']] = node['value'];
        return _.omit(node, ['key' , 'value' , 'status']);
      default:
        node[`- ${node['key']}`] = node['value1'];
        node[`+ ${node['key']}`] = node['value2'];
        return _.omit(node, ['key' , 'value' , 'status', 'value1', 'value2']);
    }
  })
  console.log(JSON.stringify(result));
  return result;
}
  return testCase(tree);
};
export default genDiff;
