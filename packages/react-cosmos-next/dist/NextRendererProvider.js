'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { createRendererUrl, } from 'react-cosmos-core';
import { GlobalErrorHandler, useDomRendererConnect, useDomRendererId, } from 'react-cosmos-dom';
import { RendererProvider } from 'react-cosmos-renderer/client';
export function NextRendererProvider({ children, rendererConfig: { rendererUrl, playgroundUrl }, selectedFixture, }) {
    const rendererId = useDomRendererId();
    const rendererConnect = useDomRendererConnect(playgroundUrl);
    const router = useRouter();
    const searchParams = useSearchParams();
    const locked = searchParams.get('locked') === 'true';
    const selectFixture = React.useCallback((fixtureId) => {
        if (rendererUrl) {
            router.replace(trimHrefHtmlExtension(createRendererUrl(rendererUrl, fixtureId)));
        }
    }, [rendererUrl, router]);
    const unselectFixture = React.useCallback(() => {
        if (rendererUrl) {
            router.replace(trimHrefHtmlExtension(createRendererUrl(rendererUrl)));
        }
    }, [rendererUrl, router]);
    const reloadRenderer = React.useCallback(() => {
        if (rendererUrl) {
            window.location.href = createRendererUrl(rendererUrl);
        }
    }, [rendererUrl]);
    return (React.createElement(RendererProvider, { rendererId: rendererId, rendererConnect: rendererConnect, locked: locked, selectedFixture: selectedFixture, selectFixture: selectFixture, unselectFixture: unselectFixture, reloadRenderer: reloadRenderer },
        children,
        typeof window !== 'undefined' && React.createElement(GlobalErrorHandler, null)));
}
function trimHrefHtmlExtension(href) {
    return href.replace(/\.html$/, '');
}
