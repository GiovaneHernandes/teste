import { useState } from "react";
export default function Brand({ footer = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`tfm-brand ${footer ? "tfm-brand--footer" : ""}`}>
      {!failed ? (
        <img src="/logo.png" alt="Top FM" onError={() => setFailed(true)} />
      ) : (
        <strong>Top FM</strong>
      )}
      <span className="tfm-brand-frequency">
        101,3 MHz<span>Bauru</span>
      </span>
    </span>
  );
}
