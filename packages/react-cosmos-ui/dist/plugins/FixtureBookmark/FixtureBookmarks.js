import { isEqual, sortBy } from 'lodash-es';
import React from 'react';
import { stringifyFixtureId, } from 'react-cosmos-core';
import styled from 'styled-components';
import { XIcon } from '../../components/icons/index.js';
import { createRelativePlaygroundUrl } from '../../shared/url.js';
import { blue, grey128, grey224, grey24, grey248, grey32, grey8, selectedColors, white10, } from '../../style/colors.js';
import { quick } from '../../style/vars.js';
export function FixtureBookmarks({ bookmarks, selectedFixtureId, onFixtureSelect, onBookmarkDelete, }) {
    const sortedBookmarks = useSortedBookmarks(bookmarks);
    if (!sortedBookmarks.length)
        return null;
    return (React.createElement(Container, null,
        React.createElement(Header, null,
            React.createElement(HeaderTitle, null, "Bookmarks")),
        sortedBookmarks.map(fixtureItem => {
            const { fixtureId } = fixtureItem;
            const itemKey = stringifyFixtureId(fixtureId);
            const selected = isEqual(fixtureId, selectedFixtureId);
            function handleClick(e) {
                e.preventDefault();
                if (e.metaKey) {
                    openAnchorInNewTab(e.currentTarget);
                }
                else {
                    onFixtureSelect(fixtureId);
                }
            }
            return (React.createElement(ListItem, { key: itemKey, selected: selected },
                React.createElement(FixtureLink, { href: createRelativePlaygroundUrl({ fixtureId }), selected: selected, onClick: handleClick }, getFixtureName(fixtureItem)),
                React.createElement(DeleteButton, { onClick: () => onBookmarkDelete(fixtureItem) },
                    React.createElement(DeleteIconContainer, null,
                        React.createElement(XIcon, null)))));
        })));
}
function useSortedBookmarks(bookmarks) {
    return React.useMemo(() => sortBy(bookmarks, b => b.fixtureId.path, b => b.fixtureId.name), [bookmarks]);
}
function openAnchorInNewTab(anchorEl) {
    // Allow users to cmd+click to open fixtures in new tab
    window.open(anchorEl.href, '_blank');
}
function getFixtureName({ name, fileName }) {
    return name ? `${fileName} ${name}` : fileName;
}
const Container = styled.div `
  padding: 0 0 8px 0;
  background: ${grey32};
`;
const Header = styled.div `
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
const HeaderTitle = styled.div `
  padding: 0 4px 0 20px;
  color: ${grey128};
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
`;
const FixtureLink = styled.a `
  flex: 1;
  padding: 0 0 0 24px;
  font-size: 14px;
  color: ${selectedColors(grey224, grey248)};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :focus {
    outline: none;
    box-shadow: inset 2px 0px 0 0 ${blue};
  }

  ::-moz-focus-inner {
    border: 0;
  }
`;
const DeleteButton = styled.span `
  flex-shrink: 0;
  width: 32px;
  height: 28px;
  padding: 0 4px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${quick}s;
`;
const DeleteIconContainer = styled.div `
  width: 16px;
  height: 16px;
  color: ${grey128};
`;
const ListItem = styled.span `
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 28px;
  background: ${selectedColors(grey32, grey8)};
  line-height: 28px;
  user-select: none;
  cursor: default;
  transition: color ${quick}s;

  :hover {
    background: ${selectedColors(grey24, grey8)};
  }

  :hover ${DeleteButton} {
    opacity: 0.6;
    :hover {
      opacity: 1;
    }
  }
`;