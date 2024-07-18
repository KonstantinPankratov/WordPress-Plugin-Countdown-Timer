import { ComboboxControlOption } from "@wordpress/components/build-types/combobox-control/types";
import { FontSize } from "@wordpress/components/build-types/font-size-picker/types";

declare module './configurationOptions' {
    const utcTimezones: ComboboxControlOption[];
    const numbersFontSizeOptions: FontSize[];
    const numbersFontWightOptions: ComboboxControlOption[];
    const unitsFontSizeOptions: FontSize[];
    const unitsFontWightOptions: ComboboxControlOption[];
    const timezoneListOptions: ComboboxControlOption[];

    export {
        utcTimezones,
        numbersFontSizeOptions,
        numbersFontWightOptions,
        unitsFontSizeOptions,
        unitsFontWightOptions,
        timezoneListOptions
    };
}