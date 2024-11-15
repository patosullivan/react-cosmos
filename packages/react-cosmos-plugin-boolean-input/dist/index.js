import React from 'react';
import { createPlugin } from 'react-plugin';
import { BooleanInput } from './BooleanInput.js';
const { plug, register } = createPlugin({
    name: 'booleanInputPlugin',
});
plug('valueInput', ({ slotProps, children }) => {
    const { name, value, indentLevel, onChange } = slotProps;
    if (value.type === 'primitive' && typeof value.data === 'boolean')
        return (React.createElement(BooleanInput, { name: name, checked: value.data, indentLevel: indentLevel, onChange: onChange }));
    // Fall back to default inputs
    return children;
});
register();
