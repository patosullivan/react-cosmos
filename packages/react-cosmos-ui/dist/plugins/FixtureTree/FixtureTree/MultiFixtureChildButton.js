import React from 'react';
import styled from 'styled-components';
import { grey144, grey192, grey248, grey8, selectedColors, } from '../../../style/colors.js';
import { quick } from '../../../style/vars.js';
import { FixtureLink } from './FixtureLink.js';
import { FixtureTreeItem } from './FixtureTreeItem.js';
export function MultiFixtureChildButton({ name, fixtureId, indentLevel, selected, selectedRef, onSelect, }) {
    return (React.createElement(FixtureLink, { fixtureId: fixtureId, onSelect: onSelect },
        React.createElement(TreeItem, { ref: selected ? selectedRef : undefined, indentLevel: indentLevel, selected: selected },
            React.createElement(Name, null, name))));
}
const Name = styled.span `
  flex-shrink: 0;
  padding: 0 8px 0 16px;
  white-space: nowrap;
  transition: opacity ${quick}s;
`;
const TreeItem = styled(FixtureTreeItem) `
  background: ${grey8};
  color: ${selectedColors(grey144, grey248)};

  :hover {
    background: ${grey8};
    color: ${selectedColors(grey192, grey248)};
  }
`;
