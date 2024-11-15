import { getWebpack } from './getWebpack.js';
import { getExportWebpackConfig } from './webpackConfig/getExportWebpackConfig.js';
export async function webpackExportPlugin({ cosmosConfig }) {
    const userWebpack = getWebpack(cosmosConfig.rootDir);
    if (!userWebpack) {
        return;
    }
    const webpackConfig = await getExportWebpackConfig(cosmosConfig, userWebpack);
    try {
        await runWebpackCompiler(userWebpack, webpackConfig);
    }
    catch (err) {
        const webpackError = err;
        if (webpackError.webpackErrors) {
            webpackError.webpackErrors.forEach(error => {
                console.error(`${error}\n`);
            });
        }
        throw webpackError;
    }
}
function runWebpackCompiler(userWebpack, webpackConfig) {
    return new Promise((resolve, reject) => {
        const compiler = userWebpack(webpackConfig);
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
            }
            else if (stats?.hasErrors()) {
                const error = new WebpackCompilationError();
                error.webpackErrors = stats.toJson().errors;
                reject(error);
            }
            else {
                resolve(stats);
            }
        });
    });
}
class WebpackCompilationError extends Error {
    webpackErrors;
    constructor() {
        super('Webpack errors occurred');
    }
}
