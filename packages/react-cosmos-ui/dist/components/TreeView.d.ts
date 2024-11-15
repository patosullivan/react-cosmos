import React, { ReactNode } from 'react';
import { TreeNode } from 'react-cosmos-core';
import { TreeExpansion } from '../shared/treeExpansion.js';
type Props<Item> = {
    node: TreeNode<Item>;
    name?: string;
    parents?: string[];
    expansion: TreeExpansion;
    setExpansion: (expansion: TreeExpansion) => unknown;
    renderNode: (args: {
        node: TreeNode<Item>;
        name: string;
        parents: string[];
        expanded: boolean;
        onToggle: () => unknown;
    }) => ReactNode;
};
export declare function TreeView<Item>({ node, name, parents, expansion, setExpansion, renderNode, }: Props<Item>): React.JSX.Element;
export {};
