import { createRequire } from 'node:module';
import path from 'path';
export function requireFrom(fromDirectory, moduleId) {
    // Inspired by https://github.com/sindresorhus/import-from
    const require = createRequire(path.resolve(fromDirectory, 'noop.js'));
    return require(moduleId);
}
