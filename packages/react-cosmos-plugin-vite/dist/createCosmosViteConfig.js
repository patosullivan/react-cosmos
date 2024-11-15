import path from 'node:path';
import { fileExists, resolveFromSilent, resolveLoose, } from 'react-cosmos';
export function createCosmosViteConfig(cosmosConfig) {
    const { rootDir } = cosmosConfig;
    const configInput = cosmosConfig.vite || {};
    const configPath = getViteConfigPath(configInput, rootDir);
    logViteConfigInfo(configPath);
    return {
        configPath,
        indexPath: configInput.indexPath
            ? resolveLoose(rootDir, configInput.indexPath)
            : null,
        port: getCosmosVitePort(configInput),
    };
}
export function getCosmosVitePort(cosmosViteConfig) {
    const { port = 5050 } = cosmosViteConfig;
    return port;
}
function getViteConfigPath({ configPath }, rootDir) {
    // User can choose to prevent automatical use of an existing vite.config.js
    // file (relative to the root dir) by setting configPath to false
    if (configPath === false) {
        return false;
    }
    if (typeof configPath == 'undefined') {
        return (resolveFromSilent(rootDir, './vite.config.ts') ||
            resolveFromSilent(rootDir, './vite.config.js') ||
            false);
    }
    const absPath = resolveLoose(rootDir, configPath);
    if (!fileExists(absPath)) {
        const relPath = path.relative(process.cwd(), absPath);
        throw new Error(`Vite config not found at path: ${relPath}`);
    }
    return absPath;
}
function logViteConfigInfo(viteConfigPath) {
    if (viteConfigPath) {
        const relPath = path.relative(process.cwd(), viteConfigPath);
        console.log(`[Cosmos] Using vite config found at ${relPath}`);
    }
    else {
        console.log(`[Cosmos] No vite config found, using default settings`);
    }
}
