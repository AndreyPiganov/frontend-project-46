import _ from 'lodash';
const diff = (tree) => {
    const result = tree.flatMap((node) => {
      const newNode = _.cloneDeep(node);
      switch (newNode.status) {
        case 'deleted':
          newNode[`- ${newNode.name}`] = newNode.value;
          break;
        case 'added':
          newNode[`+ ${newNode.name}`] = newNode.value;
          break;
        case 'nested':
          newNode[newNode.name] = diff(newNode.value);
          break;
        case 'unchanged':
          newNode[newNode.name] = newNode.value;
          break;
        default:
          newNode[`- ${newNode.name}`] = newNode.value1;
          newNode[`+ ${newNode.name}`] = newNode.value2;
          break;
      }
      return _.omit(newNode, ['name', 'value', 'status', 'value1', 'value2']);
    });
    return result;
  };
export default diff;