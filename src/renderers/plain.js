import { isObject, isString } from 'lodash';

const stringify = (value) => {
  if (isObject(value)) {
    return 'complex value';
  }
  return isString(value) ? `'${value}'` : `${value}`;
};

const render = (ast, nestedIn = '') => {
  const getString = {
    common: () => '',
    nested: node => render(node.children, `${nestedIn}${node.key}.`),
    removed: node => `Property '${nestedIn}${node.key}' was removed`,
    changed: node =>
      `Property '${nestedIn}${node.key}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`,
    added: (node) => {
      const stringified = stringify(node.value);
      const valueStr = stringified === 'complex value' ? stringified : `value: ${stringified}`;
      return `Property '${nestedIn}${node.key}' was added with ${valueStr}`;
    },
  };

  const strings = ast.map(node => getString[node.type](node));
  return strings.filter(e => e).join('\n');
};

export default render;