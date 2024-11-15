import { isNodeError } from './isNodeError.js';
import { requireFrom } from './requireModule.js';
export function requireFromSilent(fromDirectory, moduleId) {
    try {
        return requireFrom(fromDirectory, moduleId);
    }
    catch (err) {
        if (!isNodeError(err) || err.code !== 'MODULE_NOT_FOUND')
            console.log(err);
    }
}
