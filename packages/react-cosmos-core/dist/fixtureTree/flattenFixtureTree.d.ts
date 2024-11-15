import { FixtureId } from '../userModules/fixtureTypes.js';
import { FixtureTreeNode } from './types.js';
export type FlatFixtureTreeItem = {
    fileName: string;
    fixtureId: FixtureId;
    name: string | null;
    parents: string[];
};
export type FlatFixtureTree = FlatFixtureTreeItem[];
export declare function flattenFixtureTree(treeNode: FixtureTreeNode, parents?: string[]): FlatFixtureTree;
