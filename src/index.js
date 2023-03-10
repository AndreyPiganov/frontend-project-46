import _ from 'lodash';
import parse from './parsers.js';
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
      const newNode = _.cloneDeep(node);
      switch (newNode.status) {
        case 'deleted':
          newNode[`- ${newNode.key}`] = newNode.value;
          break;
        case 'added':
          newNode[`+ ${newNode.key}`] = newNode.value;
          break;
        case 'nested':
          newNode[newNode.key] = testCase(newNode.value);
          break;
        case 'unchanged':
          newNode[newNode.key] = newNode.value;
          break;
        default:
          newNode[`- ${newNode.key}`] = newNode.value1;
          newNode[`+ ${newNode.key}`] = newNode.value2;
          break;
      }
      return _.omit(newNode, ['key', 'value', 'status', 'value1', 'value2']);
    });
    return result;
  };
  console.log(JSON.stringify(testCase(tree)));
  return testCase(tree);
};
export default genDiff;
