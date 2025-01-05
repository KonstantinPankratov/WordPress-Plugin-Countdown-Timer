import { ICDTValue } from "../types/countdown";

export default function CountdownUnit({ font, children }: ICDTValue) {
  return (
    <div className="the-cdt-unit" style={{
      color: font.color,
      fontFamily: font.family,
      fontSize: font.size,
      fontWeight: font.weight
    }}>{children}</div>
  )
}