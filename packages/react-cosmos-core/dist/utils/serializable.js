import { isArray, isObject, isPrimitiveData } from './data.js';
export function pickSerializableValues(object) {
    return Object.fromEntries(Object.entries(object).filter(([k, v]) => isSerializable(v)));
}
export function isSerializable(data) {
    if (isObject(data))
        return Object.values(data).every(isSerializable);
    if (isArray(data))
        return data.every(isSerializable);
    return isPrimitiveData(data);
}
