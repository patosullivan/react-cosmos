import React from 'react';
import { DelayRender } from 'react-cosmos-core';
import styled from 'styled-components';
import { FileIcon } from '../../components/icons/index.js';
import { grey160, grey224, grey32, grey64, grey8 } from '../../style/colors.js';
export function BlankState({ fixturesDir, fixtureFileSuffix }) {
    return (React.createElement(DelayRender, { delay: 500 },
        React.createElement(Container, { "data-testid": "nav-blank-state" },
            React.createElement(IconContainer, null,
                React.createElement(FileIcon, null)),
            React.createElement(Title, null,
                "No component ",
                React.createElement(NoWrap, null, "fixtures found")),
            React.createElement(Description, null,
                React.createElement("ol", null,
                    React.createElement("li", null,
                        "Place fixture files under ",
                        React.createElement("code", null, fixturesDir),
                        " dirs or add the ",
                        React.createElement("code", null,
                            ".",
                            fixtureFileSuffix),
                        " suffix to",
                        ' ',
                        React.createElement(NoWrap, null, "their name")),
                    React.createElement("li", null,
                        "Default exports from your fixtures (any React element or component) will ",
                        React.createElement(NoWrap, null, "appear here")))))));
}
const Container = styled.div `
  padding: 16px 24px;
  background: ${grey32};
  font-size: 14px;
  line-height: 22px;
`;
const iconSize = 32;
export const IconContainer = styled.div `
  margin: 16px auto;
  display: flex;
  width: ${iconSize}px;
  height: ${iconSize}px;
  color: ${grey64};
`;
const Title = styled.div `
  margin: 0 0 24px 0;
  color: ${grey224};
  text-align: center;
  font-weight: 500;
`;
const Description = styled.div `
  margin: 0 auto;
  max-width: 256px;
  color: ${grey160};
  text-align: left;

  ol {
    padding: 0 0 0 16px;
  }

  li {
    margin-bottom: 12px;
  }

  code {
    padding: 0 4px;
    border-radius: 3px;
    background: ${grey8};
    color: ${grey224};
    font-family: 'Dank Mono', Courier, monospace;
  }
`;
export const NoWrap = styled.span `
  white-space: nowrap;
`;
