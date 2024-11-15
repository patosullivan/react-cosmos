import { createProxyMiddleware } from 'http-proxy-middleware';
export const httpProxyPlugin = {
    name: 'httpProxy',
    devServer({ cosmosConfig, platform, expressApp }) {
        if (platform !== 'web')
            return;
        const httpProxyConfig = getHttpProxyCosmosConfig(cosmosConfig);
        Object.keys(httpProxyConfig).forEach(context => {
            const config = httpProxyConfig[context];
            if (typeof config === 'string') {
                expressApp.use(context, createProxyMiddleware(context, { target: config }));
            }
            else if (typeof config === 'object') {
                expressApp.use(context, createProxyMiddleware(context, config));
            }
        });
    },
};
function getHttpProxyCosmosConfig(cosmosConfig) {
    return (cosmosConfig.httpProxy || {});
}
