import { UserModuleWrappers } from 'react-cosmos-core';
import { NextCosmosParams } from './nextTypes.js';
type Args = {
    moduleWrappers: UserModuleWrappers;
};
export declare function nextCosmosStaticParams({ moduleWrappers }: Args): () => Promise<NextCosmosParams[]>;
export {};
