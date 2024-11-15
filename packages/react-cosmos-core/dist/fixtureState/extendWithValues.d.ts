import { ObjectData } from '../utils/data.js';
import { FixtureStateValue, FixtureStateValues } from './types.js';
export declare function extendWithValues(obj: ObjectData, values: FixtureStateValues): ObjectData;
export declare function extendWithValue(data: unknown, value: FixtureStateValue): unknown;
