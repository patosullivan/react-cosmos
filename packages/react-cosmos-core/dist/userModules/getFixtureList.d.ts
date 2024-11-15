import { FixtureList, FixtureListItem } from './fixtureTypes.js';
import { ByPath, ReactFixtureExport, UserModuleWrappers } from './userModuleTypes.js';
export declare function getFixtureListFromWrappers(wrappers: UserModuleWrappers): FixtureList;
export declare function getFixtureListFromExports(exports: ByPath<ReactFixtureExport>): {
    [x: string]: FixtureListItem;
};
export declare function getFixtureItemFromExport(fixtureExport: ReactFixtureExport): FixtureListItem;
