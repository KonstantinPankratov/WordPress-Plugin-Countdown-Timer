import { ICDTValue } from "../types/countdown";

export default function CountdownValue({ font, children }: ICDTValue) {
  return (
    <div className="the-cdt-value" style={{
      color: font.color,
      fontFamily: font.family,
      fontSize: font.size,
      fontWeight: font.weight
    }}>{children}</div>
  )
}