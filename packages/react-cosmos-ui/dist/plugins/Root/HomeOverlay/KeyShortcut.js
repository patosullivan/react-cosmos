import React from 'react';
import styled from 'styled-components';
import { KeyBox } from '../../../components/KeyBox.js';
import { screenGrey1, screenGrey5 } from '../../../style/colors.js';
export function KeyShortcut({ keys, label }) {
    return (React.createElement(Container, null,
        React.createElement(Keys, null, keys.map(key => (React.createElement(KeyBox, { key: key, value: key, bgColor: screenGrey5, textColor: screenGrey1, size: 26, fontSize: 16 })))),
        React.createElement(Label, null, label)));
}
const Container = styled.div `
  display: flex;
  flex-direction: row;
  height: 26px;
  margin: 0 0 16px 0;
  line-height: 26px;

  :last-child {
    margin-bottom: 0;
  }
`;
const Keys = styled.div `
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const Label = styled.div `
  flex: 1.4;
  text-indent: 10px;
`;
