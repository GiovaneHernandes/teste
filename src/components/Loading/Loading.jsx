export default function Loading({ label = "Carregando…" }) {
  return (
    <p className="tfm-state tfm-state--loading" role="status">
      {label}
    </p>
  );
}
