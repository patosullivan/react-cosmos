import React from 'react';
import styled from 'styled-components';
import { grey128, grey160, grey32, white10 } from '../style/colors.js';
export const SidePanelContainer = styled.div `
  background: ${grey32};
  border-top: 1px solid ${white10};

  :first-child {
    border-top: none;
  }
`;
export const SidePanelHeader = styled.div `
  height: 40px;
  padding: 0 4px 0 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export function SidePanelTitle({ label, componentName }) {
    return (React.createElement(TitleContainer, null,
        React.createElement(TitleLabel, null, label),
        typeof componentName === 'string' && (React.createElement(ComponentName, null, componentName ? componentName : `(anonymous)`))));
}
export const SidePanelActions = styled.div `
  display: flex;
  flex-direction: row;

  > button {
    margin-left: 4px;

    :first-child {
      margin-left: 0;
    }
  }
`;
export const SidePanelBody = styled.div `
  padding: 0 4px 8px 4px;
`;
const TitleContainer = styled.div `
  color: ${grey128};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const TitleLabel = styled.span `
  text-transform: uppercase;
`;
const ComponentName = styled.span `
  padding-left: 8px;
  color: ${grey160};
`;
