import { buildPlaygroundQueryString, parsePlaygroundQueryString, } from 'react-cosmos-core';
export function getUrlParams() {
    return parsePlaygroundQueryString(location.search);
}
export function pushUrlParams(urlParams) {
    const query = buildPlaygroundQueryString(urlParams);
    // Refresh page completely when pushState isn't supported
    if (!history.pushState) {
        location.search = query;
        return;
    }
    // Update URL without refreshing page
    history.pushState({}, '', createRelativeUrlWithQuery(query));
}
export function subscribeToLocationChanges(userHandler) {
    const handler = () => {
        userHandler(getUrlParams());
    };
    window.addEventListener('popstate', handler);
    return () => {
        window.removeEventListener('popstate', handler);
    };
}
export function createRelativePlaygroundUrl(urlParams) {
    const query = buildPlaygroundQueryString(urlParams);
    return createRelativeUrlWithQuery(query);
}
export function createRelativeUrlWithQuery(query) {
    // NOTE: "./" is used to return to the home URL. Passing an empty string
    // doesn't do anything. And passing "/" doesn't work if Cosmos is not hosted
    // at root (sub)domain level.
    return query || './';
}
