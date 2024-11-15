import { findUserModulePaths } from '../userModules/findUserModulePaths.js';
import { importKeyPath } from '../userModules/shared.js';
export async function importUserModules({ rootDir, fixturesDir, fixturesLocation, fixtureFileSuffix, ignore, }) {
    const { fixturePaths, decoratorPaths } = await findUserModulePaths({
        rootDir,
        fixturesDir,
        fixturesLocation,
        fixtureFileSuffix,
        ignore,
    });
    return {
        fixtures: await importModules(fixturePaths, rootDir),
        decorators: await importModules(decoratorPaths, rootDir),
    };
}
async function importModules(paths, rootDir) {
    const modules = await Promise.all(paths.map(async (p) => {
        const relPath = importKeyPath(p, rootDir);
        return { relPath, module: await import(p) };
    }));
    return modules.reduce((acc, { relPath, module }) => ({
        ...acc,
        [relPath]: module,
    }), {});
}
