import _ from 'lodash';
const diff = (tree) => {
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
          newNode[newNode.key] = diff(newNode.value);
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
export default diff;