import React, { useMemo } from 'react';
import { createFixtureTree } from 'react-cosmos-core';
import styled from 'styled-components';
import { IconButton32 } from '../../components/buttons/index.js';
import { MinusSquareIcon, PlusSquareIcon, } from '../../components/icons/index.js';
import { getFullTreeExpansion, hasExpandableNodes, isTreeFullyCollapsed, } from '../../shared/treeExpansion.js';
import { grey128, grey32, white10 } from '../../style/colors.js';
export function FixtureTreeHeader({ fixturesDir, fixtureFileSuffix, fixtures, expansion, setExpansion, }) {
    const rootNode = useMemo(() => createFixtureTree({ fixtures, fixturesDir, fixtureFileSuffix }), [fixtures, fixturesDir, fixtureFileSuffix]);
    return (React.createElement(Container, null,
        React.createElement(Title, null, "Fixtures"),
        !hasExpandableNodes(rootNode) ? (React.createElement(IconButton32, { title: "Collapse all fixture tree folders", icon: React.createElement(MinusSquareIcon, null), disabled: true, onClick: () => { } })) : isTreeFullyCollapsed(expansion) ? (React.createElement(IconButton32, { title: "Expand all fixture tree folders", icon: React.createElement(PlusSquareIcon, null), onClick: () => setExpansion(getFullTreeExpansion(rootNode)) })) : (React.createElement(IconButton32, { title: "Collapse all fixture tree folders", icon: React.createElement(MinusSquareIcon, null), onClick: () => setExpansion({}) }))));
}
const Container = styled.div `
  flex-shrink: 0;
  height: 40px;
  padding: 0 4px;
  border-top: 1px solid ${white10};
  background: ${grey32};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div `
  padding: 0 4px 0 20px;
  color: ${grey128};
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
`;
