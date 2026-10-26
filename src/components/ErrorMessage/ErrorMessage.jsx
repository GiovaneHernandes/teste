export default function ErrorMessage({
  message = "Não foi possível carregar o conteúdo.",
  onRetry,
}) {
  return (
    <div
      className={`tfm-state ${onRetry ? "tfm-state--error" : ""}`}
      role="status"
    >
      <span>
        {onRetry
          ? "Não foi possível carregar este conteúdo. Tente novamente em instantes."
          : message}
        {onRetry && (
          <details className="tfm-error-details">
            <summary>Detalhes do erro</summary>
            <p>{message}</p>
          </details>
        )}
      </span>
      {onRetry && (
        <button type="button" className="tfm-btn" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}
