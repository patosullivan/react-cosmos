import path from 'node:path';
import { resolveSilent } from '../utils/resolveSilent.js';
export const pluginEndpointPlugin = {
    name: 'pluginEndpoint',
    devServer({ expressApp }) {
        expressApp.get('/_plugin/*.js', (req, res) => {
            const modulePath = req.params['0'];
            if (!modulePath) {
                res.sendStatus(404);
                return;
            }
            // The module path is always absolute, but Windows paths don't start
            // with a slash (e.g. C:\foo\bar.js)
            const resolvedPath = resolveSilent(path.isAbsolute(modulePath) ? modulePath : `/${modulePath}`);
            if (!resolvedPath) {
                res.sendStatus(404);
                return;
            }
            res.sendFile(resolvedPath);
        });
    },
};
