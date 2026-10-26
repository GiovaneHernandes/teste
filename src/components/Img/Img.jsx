import { useState } from "react";
import Icon from "../Icon/Icon";
export default function Img({
  src,
  alt = "",
  className = "",
  style,
  semLogo = false,
  priority = false,
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  if (!src || failedSrc === src)
    return (
      <div
        className={`tfm-img-vazia ${className}`}
        style={style}
        aria-hidden="true"
      >
        {!semLogo && <Icon name="image" />}
      </div>
    );
  return (
    <div className={className} style={{ ...style, overflow: "hidden" }}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : undefined}
        decoding="async"
        onError={() => setFailedSrc(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}
