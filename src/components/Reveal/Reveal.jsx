// O conteúdo editorial permanece visível: sem animações de entrada que atrasem a leitura.
// Mantém a interface do componente usado pelas páginas existentes.
export default function Reveal({
  as: Tag = "div",
  className = "",
  delay: _delay,
  children,
  ...rest
}) {
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}
