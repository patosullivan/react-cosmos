import { removeFixtureNameSuffix } from '../fixtureUtils.js';
export function hideFixtureSuffix(treeNode, suffix) {
    const { children } = treeNode;
    if (!children)
        return treeNode;
    return {
        ...treeNode,
        children: Object.keys(children).reduce((newChildren, childName) => {
            const childNode = children[childName];
            if (childNode.data.type === 'fileDir')
                return {
                    ...newChildren,
                    [childName]: hideFixtureSuffix(childNode, suffix),
                };
            const cleanFixtureName = removeFixtureNameSuffix(childName, suffix);
            return {
                ...newChildren,
                [cleanFixtureName]: hideFixtureSuffix(childNode, suffix),
            };
        }, {}),
    };
}
