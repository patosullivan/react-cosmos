import React from 'react';
import styled from 'styled-components';
import { Space } from '../../../components/Space.js';
import { Button8 } from '../../../components/buttons/index.js';
import { Minimize2Icon, RefreshCcwIcon, } from '../../../components/icons/index.js';
import { NumberInput } from '../../../components/inputs/NumberInput.js';
import { Select } from '../../../components/inputs/Select.js';
import { blue, grey128, grey144, grey216, grey248, grey8, } from '../../../style/colors.js';
import { quick } from '../../../style/vars.js';
const numberInputStypes = {
    focusedColor: grey248,
    focusedBg: grey8,
    focusedBoxShadow: `0 0 0.5px 1px ${blue}`,
};
export const ResponsiveHeader = React.memo(function ResponsiveHeader({ devices, selectedViewport, scaleFactor, scaled, selectViewport, toggleScale, }) {
    const options = React.useMemo(() => devices.map(({ width, height, label }) => {
        const value = stringifyViewport({ width, height });
        return { value, label, width, height };
    }), [devices]);
    const canScale = scaleFactor < 1;
    return (React.createElement(Container, { "data-testid": "responsiveHeader" },
        React.createElement(Left, null,
            React.createElement(Select, { testId: "viewportSelect", options: options, value: stringifyViewport(selectedViewport), color: grey248, height: 32, padding: 8, onChange: option => selectViewport({ width: option.width, height: option.height }) })),
        React.createElement(Space, { width: 4 }),
        React.createElement(Center, null,
            React.createElement(NumberInput, { value: selectedViewport.width, minValue: 0, maxValue: 5120, styles: numberInputStypes, onChange: width => selectViewport({ ...selectedViewport, width }) }),
            React.createElement(ViewportX, null, "\u00D7"),
            React.createElement(NumberInput, { value: selectedViewport.height, minValue: 0, maxValue: 5120, styles: numberInputStypes, onChange: height => selectViewport({ ...selectedViewport, height }) }),
            React.createElement(RotateButton, { title: "Rotate", onClick: () => selectViewport({
                    width: selectedViewport.height,
                    height: selectedViewport.width,
                }) },
                React.createElement(RefreshCcwIcon, { size: 14 }))),
        React.createElement(Space, { width: 4 }),
        React.createElement(Right, null, canScale ? (React.createElement(Button8, { icon: React.createElement(Minimize2Icon, null), label: getScalePercent(scaleFactor), title: "Toggle fit to scale", disabled: false, selected: scaled, onClick: toggleScale })) : (React.createElement(Button8, { icon: React.createElement(Minimize2Icon, null), label: "100%", title: "Toggle fit to scale", disabled: true, selected: false, onClick: () => { } })))));
});
function stringifyViewport({ width, height }) {
    return `${width}x${height}`;
}
function getScalePercent(scaleFactor) {
    return `${Math.floor(scaleFactor * 100)}%`;
}
const Container = styled.div `
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  background: ${grey8};
  white-space: nowrap;
  overflow-x: auto;
`;
const Left = styled.div `
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Right = styled.div `
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const Center = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ViewportX = styled.div `
  padding: 0 1px;
  line-height: 32px;
  color: ${grey128};
`;
export const RotateButton = styled.button `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 0;
  background: transparent;
  color: ${grey144};
  outline: none;
  transition: color ${quick}s;

  :hover,
  :focus {
    color: ${grey216};
  }

  ::-moz-focus-inner {
    border: 0;
  }
`;
