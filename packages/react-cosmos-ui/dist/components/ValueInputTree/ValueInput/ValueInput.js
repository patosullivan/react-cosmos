import React from 'react';
import { ValueInputSlot } from '../../../slots/ValueInputSlot.js';
import { ValueTreeItem } from '../shared.js';
import { BooleanValueInput } from './BooleanValueInput.js';
import { NullValueInput } from './NullValueInput.js';
import { NumberValueInput } from './NumberValueInput.js';
import { StringValueInput } from './StringValueInput.js';
import { UndefinedValueInput } from './UndefinedValueInput.js';
import { UnserializableValueInput } from './UnserializableValueInput.js';
import { ValueInputContainer } from './shared.js';
export function ValueInput({ value, name, id, indentLevel, onChange }) {
    return (React.createElement(ValueInputSlot, { slotProps: { id, name, value, indentLevel, onChange } },
        React.createElement(ValueTreeItem, { indentLevel: indentLevel },
            React.createElement(ValueInputContainer, null, getInput(id, name, value, onChange)))));
}
function getInput(id, name, value, onChange) {
    if (value.type === 'unserializable')
        return (React.createElement(UnserializableValueInput, { name: name, data: value.stringifiedData }));
    if (typeof value.data === 'string')
        return (React.createElement(StringValueInput, { id: id, name: name, data: value.data, onChange: onChange }));
    if (typeof value.data === 'number')
        return (React.createElement(NumberValueInput, { id: id, name: name, data: value.data, onChange: onChange }));
    if (typeof value.data === 'boolean')
        return (React.createElement(BooleanValueInput, { id: id, name: name, data: value.data, onChange: onChange }));
    if (value.data === null)
        return React.createElement(NullValueInput, { name: name });
    if (value.data === undefined)
        return React.createElement(UndefinedValueInput, { name: name });
    throw new Error(`Invalid primitive value: ${value.data}`);
}
