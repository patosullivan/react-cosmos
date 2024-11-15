export function postReloadRendererRequest(context, rendererId) {
    postRendererRequest(context, {
        type: 'reloadRenderer',
        payload: {
            rendererId,
        },
    });
}
export function postSelectFixtureRequest(context, rendererId, fixtureId, fixtureState) {
    postRendererRequest(context, {
        type: 'selectFixture',
        payload: {
            rendererId,
            fixtureId,
            fixtureState,
        },
    });
}
export function postUnselectFixtureRequest(context, rendererId) {
    postRendererRequest(context, {
        type: 'unselectFixture',
        payload: {
            rendererId,
        },
    });
}
export function postSetFixtureStateRequest(context, rendererId, fixtureId, fixtureState) {
    postRendererRequest(context, {
        type: 'setFixtureState',
        payload: {
            rendererId,
            fixtureId,
            fixtureState,
        },
    });
}
function postRendererRequest({ emit }, msg) {
    emit('request', msg);
}
