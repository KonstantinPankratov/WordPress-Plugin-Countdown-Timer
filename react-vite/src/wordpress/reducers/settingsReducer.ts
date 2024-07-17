import IConfig, { TConfigValues, TUnits } from "../../types/config";

export enum EAction {
    UPDATE_SETTING = 'UPDATE_SETTING',
    LOAD_CONFIG = 'LOAD_CONFIG',
    UPDATE_ENABLED_UNITS = 'UPDATE_ENABLED_UNITS'
}

interface IActionUpdateSetting {
    type: EAction.UPDATE_SETTING;
    group?: keyof IConfig;
    key: string;
    value: TConfigValues | string | null | undefined;
}

interface IActionLoadConfig {
    type: EAction.LOAD_CONFIG;
    value: IConfig;
}

interface IActionUpdateEnabledUnits {
    type: EAction.UPDATE_ENABLED_UNITS;
    key: string;
    value: boolean;
}

type IAction =
  | IActionUpdateSetting
  | IActionLoadConfig
  | IActionUpdateEnabledUnits;

export default function settingsReducer(state: IConfig, action: IAction): IConfig {
    switch (action.type) {
        case EAction.UPDATE_SETTING: {
            const { group, key, value } = action;

            if (group) {
                return {
                    ...state,
                    [group]: {
                        ...state[group] as object,
                        [key]: value,
                    }
                };
            }
            return {
                ...state,
                [key]: value
            };

        }
        case EAction.LOAD_CONFIG: {
            const { value } = action;
            return {
                ...state,
                ...value
            };
        }
        case EAction.UPDATE_ENABLED_UNITS: {
            const { key: unit, value: isEnabled } = action;
            if (isEnabled) {
                return {
                    ...state,
                    enabledUnits: sortedUnits(<TUnits[]>[...state.enabledUnits, unit])
                };
            }
            return {
                ...state,
                enabledUnits: sortedUnits(state.enabledUnits.filter((u) => u !== unit))
            };
        }
        default:
            return state;
    }
}

function sortedUnits(units: TUnits[]): TUnits[] {
    const order = <TUnits[]>['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
    return order.filter((unit) => units.includes(unit));
}
