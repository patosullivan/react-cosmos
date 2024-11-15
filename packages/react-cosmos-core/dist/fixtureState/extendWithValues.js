import { isArray, isObject } from '../utils/data.js';
// Use fixture state for serializable values and fall back to base values
export function extendWithValues(obj, values) {
    const extendedObj = {};
    Object.keys(values).forEach(key => {
        extendedObj[key] = extendWithValue(obj[key], values[key]);
    });
    return extendedObj;
}
export function extendWithValue(data, value) {
    if (value.type === 'unserializable')
        return data;
    if (value.type === 'object') {
        const obj = isObject(data) ? data : {};
        return extendWithValues(obj, value.values);
    }
    if (value.type === 'array') {
        const array = isArray(data) ? data : [];
        return value.values.map((v, idx) => extendWithValue(array[idx], v));
    }
    return value.data;
}
