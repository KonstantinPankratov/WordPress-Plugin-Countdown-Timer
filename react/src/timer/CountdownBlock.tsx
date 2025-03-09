import { CSSProperties } from "react";
import { ICDTBlock } from "../types/countdown";

export default function CountdownBlock({ size, style, children }: ICDTBlock) {
  const boxShadow = (style.shadow.width && style.shadow.color) ? `0 0 ${style.shadow.width}px ${style.shadow.color}` : 'none';

  return (
    <div className="the-cdt-block" style={{
      padding: style.padding + 'px',
      backgroundColor: style.background,
      borderStyle: style.border.style,
      borderWidth: style.border.width,
      borderColor: style.border.color,
      borderRadius: style.rounding,
      flexGrow: style.grow,
      aspectRatio: style.aspectRatio,
      boxShadow: boxShadow,
      '--the-cdt-value-size': size
    } as CSSProperties}>
      {children}
    </div>
  );
}