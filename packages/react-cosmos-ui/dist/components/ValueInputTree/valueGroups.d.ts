import { FixtureElementId, FixtureStateValues } from 'react-cosmos-core';
interface FixtureStateValueGroup {
    elementId: FixtureElementId;
    values: FixtureStateValues;
}
export declare function hasFsValues(valueGroup: FixtureStateValueGroup): boolean;
export declare function sortFsValueGroups<GroupType extends FixtureStateValueGroup>(valueGroups: GroupType[]): GroupType[];
export {};
