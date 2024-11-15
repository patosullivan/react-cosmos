import { UserModulePaths } from './shared.js';
type FindUserModulePathsArgs = {
    rootDir: string;
    fixturesDir: string;
    fixturesLocation?: string;
    fixtureFileSuffix: string;
    ignore: string[];
};
export declare function findUserModulePaths({ rootDir, fixturesDir, fixturesLocation, fixtureFileSuffix, ignore, }: FindUserModulePathsArgs): Promise<UserModulePaths>;
export {};
