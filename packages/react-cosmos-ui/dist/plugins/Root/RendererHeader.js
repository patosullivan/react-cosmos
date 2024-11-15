import { isEqual } from 'lodash-es';
import React from 'react';
import styled from 'styled-components';
import { IconButton32 } from '../../components/buttons/index.js';
import { MenuIcon, RotateCcwIcon, SlidersIcon, XCircleIcon, } from '../../components/icons/index.js';
import { FixtureActionSlot } from '../../slots/FixtureActionSlot.js';
import { RendererActionSlot } from '../../slots/RendererActionSlot.js';
import { grey176, grey32, white10 } from '../../style/colors.js';
export const RendererHeader = React.memo(function RendererHeader({ fixtureItems, fixtureId, navOpen, panelOpen, fixtureActionOrder, rendererActionOrder, onOpenNav, onTogglePanel, onReloadRenderer, onClose, }) {
    const fixtureItem = findFixtureItemById(fixtureItems, fixtureId);
    const slotProps = React.useMemo(() => ({ fixtureId }), [fixtureId]);
    return (React.createElement(Container, null,
        React.createElement(Left, null,
            !navOpen && (React.createElement(React.Fragment, null,
                React.createElement(IconButton32, { icon: React.createElement(MenuIcon, null), title: "Show fixture list (L)", selected: false, onClick: onOpenNav }),
                React.createElement(ButtonSeparator, null))),
            React.createElement(IconButton32, { icon: React.createElement(XCircleIcon, null), title: "Close fixture", onClick: onClose }),
            React.createElement(IconButton32, { icon: React.createElement(RotateCcwIcon, null), title: "Reload fixture (R)", onClick: onReloadRenderer }),
            fixtureItem && (React.createElement(FixtureActionSlotContainer, { fixtureActionOrder: fixtureActionOrder, fixtureItem: fixtureItem }))),
        fixtureItem && React.createElement(FixtureName, null, getFixtureName(fixtureItem)),
        React.createElement(Right, null,
            React.createElement(RendererActionSlot, { slotProps: slotProps, plugOrder: rendererActionOrder }),
            React.createElement(IconButton32, { icon: React.createElement(SlidersIcon, null), title: "Toggle control panel (P)", selected: panelOpen, onClick: onTogglePanel }))));
});
function FixtureActionSlotContainer({ fixtureActionOrder, fixtureItem, }) {
    const slotProps = React.useMemo(() => ({ fixtureItem }), [fixtureItem]);
    return (React.createElement(FixtureActionSlot, { slotProps: slotProps, plugOrder: fixtureActionOrder }));
}
function findFixtureItemById(fixtureItems, fixtureId) {
    if (fixtureId.name) {
        return fixtureItems.find(fixtureItem => isEqual(fixtureItem.fixtureId, fixtureId));
    }
    // When a multi fixture is selected by path only, the first of its named
    // fixtures will be selected.
    return fixtureItems.find(fixtureItem => fixtureItem.fixtureId.path === fixtureId.path);
}
function getFixtureName({ name, fileName }) {
    return name ? `${fileName} ${name}` : fileName;
}
const Container = styled.div `
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 4px;
  border-bottom: 1px solid ${white10};
  background: ${grey32};
  white-space: nowrap;
  overflow-x: auto;
`;
const Actions = styled.div `
  > button {
    margin-left: 4px;

    :first-child {
      margin-left: 0;
    }
  }
`;
const Left = styled(Actions) `
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Right = styled(Actions) `
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ButtonSeparator = styled.div `
  flex-shrink: 0;
  background: ${white10};
  width: 1px;
  height: 40px;
  margin-left: 4px;
`;
const FixtureName = styled.div `
  margin: 0 32px;
  padding: 4px 0;
  color: ${grey176};
  line-height: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
