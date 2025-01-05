import { ReactNode } from "react";
import { IBlocks, IFont, ISeparator } from "./config";

export interface ICDTValue {
  font: IFont,
  children: ReactNode
}

export interface ICDTBlock {
  size: number,
  style: IBlocks,
  children: ReactNode
}

export interface ICDTDelimiter {
  delimiter: ISeparator
}