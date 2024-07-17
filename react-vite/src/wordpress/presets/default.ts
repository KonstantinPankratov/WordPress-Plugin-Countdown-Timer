import IConfig from "../../types/config";

const defaultPreset: IConfig = {
    "datetime": "2024-06-31T16:27",
    "timezone": "UTC",
    "enabledUnits": ["days", "hours", "minutes", "seconds"],
    "defaultUnits": {
        "years": "Years",
        "months": "Months",
        "weeks": "Weeks",
        "days": "Days",
        "hours": "Hours",
        "minutes": "Minutes",
        "seconds": "Seconds"
    },
    "unitTranslations": {
        "en": {
            "days": "Days",
            "hours": "Hours",
            "minutes": "Minutes",
            "seconds": "Seconds"
        }
    },
    "numbersFont": {
        "family": "monospace",
        "weight": "700",
        "size": 60,
        "color": "#000000"
    },
    "unitsFont": {
        "family": "inherit",
        "weight": "700",
        "size": 13,
        "color": "#000000"
    },
    "timeSeparator": {
        "symbol": "",
        "size": 60,
        "weight": "700",
        "color": "#000000"
    },
    "daySeparator": {
        "symbol": "",
        "size": 60,
        "weight": "700",
        "color": "#000000"
    },
    "blocks": {
        "background": "transparent",
        "rounding": 0,
        "border": {
            "color": "",
            "width": 0,
            "style": "none"
        },
        "shadow": {
            "color": "",
            "width": 0
        },
        "padding": 0,
        "grow": 0,
        "aspectRatio": "auto"
    },
    "container": {
        "gap": 5,
        "alignment": "left"
    },
    "expiration": {
        "visibility": "keep",
        "text": ""
    }
};

export default defaultPreset;