export function collapseNamedIndexes(treeNode) {
    const { data, children } = treeNode;
    if (data.type !== 'fileDir' || !children)
        return treeNode;
    return {
        ...treeNode,
        children: Object.keys(children).reduce((newChildren, childName) => {
            const childNode = children[childName];
            const next = () => ({
                ...newChildren,
                [childName]: collapseNamedIndexes(childNode),
            });
            const grandchildren = childNode.children;
            if (childNode.data.type !== 'fileDir' || !grandchildren)
                return next();
            const grandchildNames = Object.keys(grandchildren);
            if (grandchildNames.length !== 1)
                return next();
            const [firstGrandchildName] = grandchildNames;
            const firstGrandchildNode = grandchildren[firstGrandchildName];
            const isUnnamed = firstGrandchildName === 'fixture';
            if (firstGrandchildNode.data.type !== 'fileDir' &&
                (noCaseEqual(childName, firstGrandchildName) || isUnnamed))
                return {
                    ...newChildren,
                    [isUnnamed ? childName : firstGrandchildName]: firstGrandchildNode,
                };
            return next();
        }, {}),
    };
}
function noCaseEqual(a, b) {
    return a.toUpperCase() === b.toUpperCase();
}
