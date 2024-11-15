import { glob } from 'glob';
import micromatch from 'micromatch';
import { getDecoratorPatterns, getFixturePatterns, } from './shared.js';
export async function findUserModulePaths({ rootDir, fixturesDir, fixturesLocation, fixtureFileSuffix, ignore, }) {
    const paths = await glob('**/*', {
        cwd: fixturesLocation ? fixturesLocation : rootDir,
        absolute: true,
        ignore,
    });
    const fixturePatterns = getFixturePatterns(fixturesDir, fixtureFileSuffix);
    const fixturePaths = getMatchingPaths(paths, fixturePatterns);
    const decoratorPaths = getMatchingPaths(paths, getDecoratorPatterns());
    // Omit decorators from fixture paths, which happens when decorators are
    // placed inside fixture dirs.
    const nonDecoratorFixturePaths = fixturePaths.filter(fixturePath => decoratorPaths.indexOf(fixturePath) === -1);
    return { fixturePaths: nonDecoratorFixturePaths, decoratorPaths };
}
function getMatchingPaths(paths, patterns) {
    return micromatch(paths, patterns, { dot: true });
}
