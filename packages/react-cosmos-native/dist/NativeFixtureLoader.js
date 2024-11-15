import React from 'react';
import { ClientFixtureLoader } from 'react-cosmos-renderer/client';
import * as ReactNative from 'react-native';
import { NativeRendererProvider } from './NativeRendererProvider.js';
const { View, Text, StyleSheet } = ReactNative;
export function NativeFixtureLoader({ rendererConfig, moduleWrappers, initialFixtureId, }) {
    return (React.createElement(NativeRendererProvider, { rendererConfig: rendererConfig, initialFixtureId: initialFixtureId },
        React.createElement(ClientFixtureLoader, { moduleWrappers: moduleWrappers, renderMessage: renderMessage })));
}
function renderMessage(msg) {
    return (React.createElement(View, { style: styles.container },
        React.createElement(Text, { style: styles.text }, msg)));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: '300',
    },
});
