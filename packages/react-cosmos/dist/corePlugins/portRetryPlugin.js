import { findNextAvailablePort } from '../shared/findNextAvailablePort.js';
export const portRetryPlugin = {
    name: 'portRetry',
    async config({ cosmosConfig, command }) {
        if (command === 'export') {
            return cosmosConfig;
        }
        const { port, portRetries } = cosmosConfig;
        return {
            ...cosmosConfig,
            port: portRetries ? await findNextAvailablePort(port, portRetries) : port,
        };
    },
};