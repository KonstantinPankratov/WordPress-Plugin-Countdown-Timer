export function settingsReducer(state, action) {
    const { group, key, value } = action;

    switch (action.type) {
        case 'UPDATE_SETTING':
            if (group) {
                return {
                    ...state,
                    [group]: {
                        ...state[group],
                        [key]: value,
                    }
                };
            }
            return {
                ...state,
                [key]: value
            };
        case 'LOAD_CONFIG':
            return {
                ...state,
                ...value
            };
        case 'UPDATE_ENABLED_UNITS':
            const { checked } = action;
            const enabledUnits = state['enabledUnits'] ?? [];
            const newUnits = checked
                ? [...enabledUnits, key]
                    : enabledUnits.filter((u) => u!== key);
            const sortedUnits = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'].filter(unit => newUnits.includes(unit));
            return {
                ...state,
                'enabledUnits': sortedUnits
            };
        case 'UPDATE_UNITS_TRANSLATION':
            const { lang, unit } = action;
            return {
                ...state,
                unitTranslations: {
                    ...state.translations,
                    [lang]: {
                        ...state.translations[lang],
                        [unit]: value,
                    },
                },
            };
        default:
            return state;
    }
}
