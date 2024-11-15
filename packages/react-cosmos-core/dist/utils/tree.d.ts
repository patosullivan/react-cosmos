export type TreeNode<T> = {
    data: T;
    children?: Record<string, TreeNode<T>>;
};
export declare function addTreeNodeChild<T>(parentNode: TreeNode<T>, childName: string, childNode: TreeNode<T>): void;
export declare function sortTreeChildren<T>(node: TreeNode<T>): TreeNode<T>;
