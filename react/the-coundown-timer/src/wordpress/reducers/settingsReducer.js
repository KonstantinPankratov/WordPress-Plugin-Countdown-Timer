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
