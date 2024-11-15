import React from 'react';
export function BooleanInput({ indentLevel, name, checked, onChange }) {
    return (React.createElement("label", { style: {
            display: 'flex',
            height: 28,
            marginLeft: indentLevel * 12 + 20,
            flexDirection: 'row',
            alignItems: 'center',
            color: 'rgb(224, 224, 224)',
            userSelect: 'none',
            lineHeight: '28px',
        } },
        React.createElement("input", { style: { marginRight: 8 }, type: "checkbox", checked: checked, onChange: e => onChange(e.target.checked) }),
        name));
}
