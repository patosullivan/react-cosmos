import { isNodeError } from './isNodeError.js';
import { resolveFrom } from './resolve.js';
export function resolveFromSilent(fromDirectory, moduleId) {
    try {
        return resolveFrom(fromDirectory, moduleId);
    }
    catch (err) {
        if (!isNodeError(err) || err.code !== 'MODULE_NOT_FOUND')
            console.log(err);
        return null;
    }
}
