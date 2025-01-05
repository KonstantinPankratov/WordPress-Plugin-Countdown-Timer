import { ICDTDelimiter } from "../types/countdown";

export default function CountdownDelimiter({ delimiter }: ICDTDelimiter) {
  return (
    <div className="the-cdt-delimiter" style={{ color: delimiter.color, fontSize: delimiter.size, fontWeight: delimiter.weight }}>{delimiter.symbol}</div>
  );
}