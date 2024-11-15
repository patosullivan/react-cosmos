import React from 'react';
import { ArraySlot, Slot } from 'react-plugin';
import styled from 'styled-components';
import { useDrag } from '../../hooks/useDrag.js';
import { NavRowSlot } from '../../slots/NavRowSlot.js';
import { grey32, grey8, white10 } from '../../style/colors.js';
import { GlobalHeader } from './GlobalHeader.js';
import { HomeOverlay } from './HomeOverlay/HomeOverlay.js';
import { RendererHeader } from './RendererHeader.js';
import { SidePanel } from './SidePanel.js';
export function Root({ fixtureItems, selectedFixtureId, rendererConnected, getFixtureState, setFixtureState, navOpen, panelOpen, navWidth, panelWidth, sidePanelRowOrder, globalActionOrder, globalOrder, navRowOrder, fixtureActionOrder, rendererActionOrder, onToggleNav, onTogglePanel, onReloadRenderer, onCloseFixture, setNavWidth, setPanelWidth, welcomeDismissed, onDismissWelcome, onShowWelcome, }) {
    const navDrag = useDrag({
        value: navWidth,
        onChange: setNavWidth,
    });
    const panelDrag = useDrag({
        value: panelWidth,
        reverse: true,
        onChange: setPanelWidth,
    });
    const showNav = navOpen || !selectedFixtureId;
    const dragging = navDrag.dragging || panelDrag.dragging;
    // z-indexes are set here on purpose to show the layer hierarchy at a glance
    return (React.createElement(Container, { dragging: dragging },
        showNav && (React.createElement(Draggable, { style: { width: navWidth, zIndex: 2 } },
            React.createElement(Nav, null,
                React.createElement(NavRowSlot, { slotProps: { onCloseNav: onToggleNav }, plugOrder: navRowOrder })),
            navDrag.dragging && React.createElement(DragOverlay, null),
            React.createElement(NavDragHandle, { ref: navDrag.dragElRef }))),
        React.createElement(MainContainer, { key: "main", style: { zIndex: 1 } },
            !selectedFixtureId && (React.createElement(GlobalHeader, { rendererConnected: rendererConnected, globalActionOrder: globalActionOrder })),
            React.createElement(RendererContainer, { key: "rendererContainer" },
                selectedFixtureId && (React.createElement(RendererHeader, { fixtureItems: fixtureItems, fixtureId: selectedFixtureId, navOpen: navOpen, panelOpen: panelOpen, fixtureActionOrder: fixtureActionOrder, rendererActionOrder: rendererActionOrder, onOpenNav: onToggleNav, onTogglePanel: onTogglePanel, onReloadRenderer: onReloadRenderer, onClose: onCloseFixture })),
                React.createElement(RendererBody, { key: "rendererBody" },
                    React.createElement(Slot, { name: "rendererPreview" }),
                    dragging && React.createElement(DragOverlay, null),
                    selectedFixtureId && panelOpen && (React.createElement(ControlPanelContainer, { style: { width: panelWidth, zIndex: 3 } },
                        React.createElement(SidePanel, { fixtureId: selectedFixtureId, getFixtureState: getFixtureState, setFixtureState: setFixtureState, sidePanelRowOrder: sidePanelRowOrder }),
                        panelDrag.dragging && React.createElement(DragOverlay, null),
                        React.createElement(PanelDragHandle, { ref: panelDrag.dragElRef })))),
                !selectedFixtureId && (React.createElement(Slot, { name: "homeOverlay" },
                    React.createElement(HomeOverlay, { welcomeDismissed: welcomeDismissed, onDismissWelcome: onDismissWelcome, onShowWelcome: onShowWelcome }))))),
        React.createElement("div", { style: { zIndex: 4 } },
            React.createElement(ArraySlot, { name: "global", plugOrder: globalOrder }))));
}
const Container = styled.div.attrs({ 'data-testid': 'root' }) `
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: ${grey32};
  cursor: ${props => (props.dragging ? 'col-resize' : 'default')};
`;
const Draggable = styled.div `
  flex-shrink: 0;
  position: relative;
`;
const Nav = styled.div `
  width: 100%;
  height: 100%;
  background: ${grey32};
  display: flex;
  flex-direction: column;
`;
const MainContainer = styled.div `
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const RendererContainer = styled.div `
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;
const RendererBody = styled.div `
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background: ${grey8};
  overflow: hidden;
`;
const ControlPanelContainer = styled(Draggable) `
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;
const DragHandle = styled.div `
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: ${white10};
  background-clip: content-box;
  cursor: col-resize;
  user-select: none;
`;
const NavDragHandle = styled(DragHandle) `
  right: -2px;
  padding: 0 2px;
`;
const PanelDragHandle = styled(DragHandle) `
  left: -2px;
  padding: 0 1px 0 2px;
`;
// The purpose of DragOverlay is to cover the renderer iframe while dragging,
// because otherwise the iframe steaps the mousemove events and stops the drag.
const DragOverlay = styled.div `
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
