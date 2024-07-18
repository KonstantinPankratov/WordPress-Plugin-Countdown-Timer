import { Border } from "@wordpress/components/build-types/border-control/types";

export type TUnits = 'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds';

export type IDefaultUnits = {
    [key in TUnits]?: string;
}

export interface IUnitTranslation {
    [key: string]: IDefaultUnits;
}

export interface IFont {
    family: string;
    size: number;
    weight: string;
    color: string;
}

export interface ISeparator {
    symbol: string;
    size: number;
    weight: string;
    color: string;
}

export interface IBlocks {
    background: string;
    rounding: number;
    border: Border;
    shadow: Border;
    padding: number;
    grow: string;
    aspectRatio: string;
}

export interface IContainer {
    gap: number;
    alignment: string;
}

export interface IExpiration {
    visibility: string;
    text: string;
}

export type TConfigValues = 
string | 
number | 
TUnits[] | 
IDefaultUnits | 
IUnitTranslation | 
IFont | 
ISeparator | 
IBlocks | 
IContainer | 
IExpiration | 
Border;

export default interface IConfig {
    datetime?: string,
    timezone?: string,
    enabledUnits: TUnits[],
    defaultUnits: IDefaultUnits,
    unitTranslations: IUnitTranslation,
    numbersFont: IFont,
    unitsFont: IFont,
    timeSeparator: ISeparator,
    daySeparator: ISeparator,
    blocks: IBlocks,
    container: IContainer,
    expiration: IExpiration,
}

export interface IPreview {
    bg: string
}