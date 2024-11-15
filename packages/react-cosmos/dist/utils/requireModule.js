import { createRequire } from 'node:module';
export function requireModule(moduleId) {
    const require = createRequire(import.meta.url);
    return require(moduleId);
}
